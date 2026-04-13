---
title: Cron & Hintergrund-Jobs einrichten
---

# Cron & Hintergrund-Jobs einrichten

intraRP nutzt eine **asynchrone Job-Queue**, damit langsame Operationen (Discord-Webhooks, PDF-Rendering, Federation-Sync, Bulk-Notifications) den User-Request nicht blockieren. Dafür muss regelmäßig ein **Worker** laufen, der die Queue abarbeitet.

Der Worker ist bewusst so gebaut, dass er **nicht als Daemon laufen muss** — er terminiert sich nach einer konfigurierbaren Laufzeit (Default 55 Sekunden) selbst und wird vom Cron immer wieder neu gestartet. Das funktioniert auch auf einfachen Shared-Hosts ohne SSH-Zugriff.

!!! info "Ohne Cron läuft's trotzdem"
    Wenn du keinen Cron einrichtest, läuft intraRP weiter wie bisher — der Job-Dispatcher erkennt automatisch, dass die Queue nicht abgearbeitet wird und führt die Jobs direkt synchron im User-Request aus. Du verlierst nur den Performance-Vorteil, aber nichts bricht. Das macht den Cron-Setup-Schritt komplett optional und jederzeit nachholbar.

## Drei Wege zum Cron

Je nach Hosting-Situation gibt es drei typische Setups:

=== "1. SSH / VPS (empfohlen)"

    Wenn du SSH-Zugriff auf den Server hast, ist das die einfachste und zuverlässigste Variante. Öffne den Crontab mit `crontab -e` und füge eine Zeile hinzu:

    ```cron
    * * * * * /usr/bin/php /pfad/zu/intraRP/cli/queue-worker.php --max-time=55 >> /pfad/zu/intraRP/storage/logs/queue-cron.log 2>&1
    ```

    **Was das macht:**

    - `* * * * *` — jede Minute ausführen
    - `php cli/queue-worker.php` — der Worker-Script
    - `--max-time=55` — nach 55 Sekunden beenden (bevor der nächste Cron-Lauf startet)
    - `>> queue-cron.log 2>&1` — Output + Fehler ins Log-File schreiben

    **Vorteile:** schnell, keine HTTP-Overhead, direkte STDOUT-Logs.

    **Voraussetzung:** SSH-Zugriff und ein PHP-CLI-Binary (typisch auf VPS und Root-Servern).

=== "2. Managed Hosting mit Cron-Panel"

    Viele Managed-Hoster (All-Inkl, HostEurope, Webgo, IONOS etc.) bieten in ihrem Hosting-Panel eine „Cron-Jobs"-Sektion an, wo du Befehle direkt eintragen kannst.

    **Typische Einstellungen:**

    | Feld | Wert |
    |---|---|
    | Intervall | Alle 1 Minute (oder 5 Minuten) |
    | Befehl | `/usr/bin/php /htdocs/intraRP/cli/queue-worker.php --max-time=55` |
    | Output | `/htdocs/intraRP/storage/logs/queue-cron.log` (oder „verwerfen") |

    **Wichtig:** Frag deinen Hoster, wo das PHP-Binary liegt. Häufig:

    - All-Inkl: `/usr/bin/php82` oder `/usr/bin/php-cli`
    - HostEurope: `/usr/bin/php`
    - Webgo: `/opt/RZphp82/bin/php-cli`
    - IONOS: `/usr/bin/php8.2`

    Und passe den Pfad zu `intraRP/cli/queue-worker.php` auf deine tatsächliche Installationsstruktur an (häufig `/htdocs/intraRP/` oder `/kunden/homepages/xx/dxxxxxxxxx/htdocs/intraRP/`).

=== "3. Managed Hosting ohne CLI / cron-job.org"

    Wenn dein Hoster keinen CLI-Zugriff erlaubt und auch keine Cron-Jobs anbietet, kannst du den Worker über **HTTP** anstoßen — mit einem externen Cron-Service wie [cron-job.org](https://cron-job.org) (kostenlos, in Deutschland gehostet).

    intraRP stellt dafür einen HTTP-triggerbaren Wrapper bereit: **`cron/queue-worker-cron.php`**.

    **Einrichtung:**

    1. **Account anlegen** bei [cron-job.org](https://cron-job.org) (kostenlos)
    2. Im Dashboard auf **„Cronjobs" → „Create cronjob"** klicken
    3. Folgende Werte eintragen:

    | Feld | Wert |
    |---|---|
    | **Title** | `intraRP Queue Worker` |
    | **Address / URL** | `https://deine-intrarp.de/cron/queue-worker-cron.php?queue=default&max_time=55` |
    | **Schedule** | Every 1 minute (oder 5 minutes bei Free-Tier-Limits) |
    | **Request method** | `GET` |
    | **Enable job** | ✓ |

    4. Unter **„Advanced"** → **„Request headers"** einen Header hinzufügen:

    | Name | Value |
    |---|---|
    | `X-API-Key` | `<dein-API-KEY>` |

    Den API-Key findest du in intraRP unter **Einstellungen → System → Konfiguration** als `API_KEY`-Wert. Falls du noch keinen gesetzt hast, generiere einen unter **Einstellungen → System → API-Key regenerieren**.

    !!! warning "API-Key schützen"
        Der API-Key ist der einzige Schutz vor unautorisiertem Queue-Worker-Aufruf. Ohne ihn könnte jeder im Internet deinen Worker-Endpoint rufen und die Queue manipulieren. Schreib ihn niemals in öffentliche Repos oder Bug-Reports.

    5. **Speichern** — cron-job.org ruft ab jetzt jede Minute deinen Worker-Endpoint auf und arbeitet bis zu 50 Jobs pro Aufruf ab.

    **Alternative Services** mit ähnlicher Funktionalität:

    - [EasyCron](https://www.easycron.com) — kostenlose Stufe mit 20 Aufrufen/Tag
    - [SetCronJob](https://www.setcronjob.com) — 1-Minuten-Intervall in der Free-Variante
    - [UptimeRobot](https://uptimerobot.com) — eigentlich Uptime-Monitoring, aber `HTTP GET`-Monitore können als Cron missbraucht werden (5-Minuten-Intervall)

## Verifizieren dass es läuft

Nach dem Setup kannst du prüfen, ob der Worker tatsächlich ausgeführt wird:

1. **In intraRP** unter **Einstellungen → System → Fehlerprotokoll** (siehe [Fehlerprotokoll](fehlerprotokoll.md)) nach `QueueWorker: started` / `QueueWorkerCron: started`-Log-Einträgen suchen. Die sollten alle 1–5 Minuten auftauchen.

2. **Einen Test-Job dispatchen** — z.B. ein eNOTF-Protokoll freigeben. Der Discord-Webhook wird in die Queue gelegt. Nach maximal 1–5 Minuten (je nach Cron-Intervall) solltest du die Nachricht in Discord sehen.

3. **Die Queue-Tabelle ansehen** — in einem DB-Viewer (phpMyAdmin oder ähnlich) die Tabelle `intra_jobs` öffnen. Wenn sie leer ist oder nur kurz Einträge hat, funktioniert der Worker. Wenn dort Einträge stunden- oder tagelang rumliegen, läuft der Cron nicht.

## Fehler-Jobs

Wenn ein Job nach **3 Versuchen** immer noch fehlschlägt (z.B. weil Discord down ist oder ein falscher Webhook-URL hinterlegt ist), wandert er in die Tabelle `intra_failed_jobs`. Dort findest du:

- Den ursprünglichen Payload
- Die vollständige Exception-Nachricht und den Stack-Trace
- Den Zeitpunkt des finalen Scheiterns

Du kannst fehlgeschlagene Jobs über den DB-Viewer inspizieren und entweder manuell löschen oder (in einem künftigen Admin-UI-Update) mit einem Klick neu versuchen lassen.

## Häufige Probleme

!!! failure "Fehler: „php: command not found"`

    Dein Hoster hat kein PHP-Binary im `$PATH`. Frag im Support nach dem absoluten Pfad (typisch `/usr/bin/php82` o.ä.) und nutze den.

!!! failure "Fehler: „Could not open input file: cli/queue-worker.php"`

    Der relative Pfad in deinem Cron-Eintrag ist falsch. Nutze den **absoluten** Pfad zu `cli/queue-worker.php`. Den findest du via SSH mit `pwd` im intraRP-Verzeichnis, oder über dein Hosting-Panel als „Installationspfad".

!!! failure "cron-job.org zeigt HTTP 403"`

    Der API-Key-Header fehlt oder stimmt nicht. Check:

    - `X-API-Key`-Header ist gesetzt (exakt so geschrieben)
    - Der Wert ist identisch zu `API_KEY` in deiner Config
    - Keine Leerzeichen im Key
    - Der Key ist nicht `CHANGE_ME` (Default-Fallback, wird abgelehnt)

!!! failure "Jobs laufen nicht ab, aber Cron wird ausgeführt"

    Die `intra_jobs`-Tabelle existiert nicht. Stell sicher, dass die Phinx-Migration `20260413000001_create_intra_jobs_and_failed_jobs` gelaufen ist. intraRP führt Migrations automatisch beim nächsten Request aus — ruf einfach irgendeine normale Seite auf.

!!! question "Intervall: 1 Minute oder 5 Minuten?"

    Für die meisten Setups reicht **1 Minute**. Bei cron-job.org im Free-Tier hast du ein **1-Minuten-Intervall erlaubt**, solange die Ziel-URL schnell antwortet. Wenn du im Monitoring Warnings wegen langer Request-Dauer bekommst, stell auf 2 oder 5 Minuten um — intraRP-Jobs sind nicht zeitkritisch, 5 Minuten Latenz ist für Discord-Benachrichtigungen meist akzeptabel.

## Performance & Tuning

Der Worker akzeptiert mehrere Tuning-Parameter:

```bash
php cli/queue-worker.php --queue=default --max-time=55 --max-jobs=50 --sleep=3
```

| Parameter | Default | Bedeutung |
|---|---|---|
| `--queue` | `default` | Name der Queue, die abgearbeitet wird |
| `--max-time` | `55` | Maximale Laufzeit in Sekunden, bevor der Worker sich selbst beendet |
| `--max-jobs` | `50` | Maximale Anzahl Jobs pro Worker-Lauf |
| `--sleep` | `3` | Wartezeit zwischen leeren Poll-Aufrufen (Sekunden) |

**Tipps:**

- **`--max-time` muss kleiner als dein Cron-Intervall sein.** Bei 1-Minuten-Cron → 55s. Bei 5-Minuten-Cron kannst du 280s nehmen, dann läuft der Worker fast die ganze Zeit durch.
- **Separate Queues** für kritische vs. unkritische Jobs: z.B. `--queue=notifications` für Discord-Webhooks (schnell, häufig) und `--queue=reports` für PDF-Generierung (langsam, selten). Zwei Cron-Einträge mit unterschiedlichem `--queue`-Wert.
- **Monitoring:** Log-Rotation von `storage/logs/queue-cron.log` einrichten, sonst wird die Datei mit der Zeit groß. Monolog rotiert `app-*.log` und `error-*.log` automatisch, aber der CLI-Ausgabe-Redirect nicht.
