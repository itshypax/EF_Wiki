---
title: Fehlerprotokoll
---

# Fehlerprotokoll

Das integrierte Fehlerprotokoll zeigt dir alle unerwarteten Fehler deiner intraRP-Installation an einer zentralen Stelle — durchsuchbar, gruppiert nach Fehlertyp, mit vollem Stack-Trace und direkter Kopier-Funktion für Bug-Reports.

Du findest es unter:

**Einstellungen → System → Fehlerprotokoll**

Zugriff haben alle User mit der Berechtigung `admin`.

## Error-IDs — das Herzstück

Wenn ein User einen Fehler in intraRP sieht, bekommt er eine **Error-ID** angezeigt — ein 8-stelliger Hex-Code wie `0B29305D`. Diese ID:

- Ist **eindeutig pro Fehler-Auftreten**
- Wird **automatisch ins Log geschrieben** mit vollem Stack-Trace
- Ist **auch in Production sichtbar** (anders als Stack-Traces, die nur im Development-Modus gezeigt werden)
- Kann vom Admin ohne Server-Zugriff aufgelöst werden

Das heißt: ein normaler User kann dir einfach „Ich hab Error `F5FC4ECD` bekommen" schreiben, und du findest in Sekunden den vollständigen Fehler — inklusive betroffener Datei, Zeile, Exception-Klasse und Stack-Trace.

## Das Admin-Panel

### Error-ID-Lookup

Ganz oben auf der Seite findest du ein kompaktes Eingabefeld für eine Error-ID. Tippe die ID aus der Fehlermeldung ein, klick **„Suchen"** — der komplette Fehler wird dir sofort angezeigt. Alternativ geht auch ein direkter Link:

```
https://deine-intraRP.de/settings/system/logs.php?id=0B29305D
```

Falls die ID nicht gefunden wird, ist sie entweder in einer bereits rotierten Log-Datei (ältere Fehler werden nach 90 Tagen gelöscht) oder die ID wurde falsch abgeschrieben.

### Statistik-Übersicht

Direkt darunter siehst du fünf kompakte Kacheln:

- **Errors gesamt** — alle gefundenen Errors in allen verfügbaren Log-Dateien
- **Letzte 24h** — Errors der letzten 24 Stunden
- **Letzte 7 Tage** — Wochen-Summe
- **Critical / Error** — Aufschlüsselung nach Schweregrad

### Fehler-Inbox (gruppiert)

Anders als rohe Log-Files gruppiert intraRP identische Fehler automatisch. Zwei Fehler gelten als identisch, wenn sie dieselbe Kombination aus **Exception-Klasse + Datei + Zeile** haben. In der Inbox siehst du dann:

- **Sample** — ein Beispiel-Eintrag (typischerweise der neueste)
- **Count** — wie oft dieser Fehler bereits aufgetreten ist (z.B. `×42`)
- **First seen / Last seen** — wann zum ersten und zuletzt aufgetreten
- **Error-IDs der Gruppe** — alle IDs, die zu dieser Fehlergruppe gehören (bis zu 10 angezeigt, Rest als „+N weitere")

Ein Klick auf eine Gruppe klappt die Details aus: Fehlermeldung, Exception-Klasse, Datei + Zeile, Stack-Trace, Context-Daten.

### Volltext-Suche

Unter den Statistik-Kacheln findest du ein **Volltext-Filter-Feld**, mit dem du gezielt nach Begriffen im Fehler suchen kannst (z.B. `SQLSTATE`, `Permissions::hasPermission`, konkrete Datei-Pfade). Zusätzlich:

- **Scope-Filter** — Alle / Critical / Error / Warning
- **File-Filter** — nur aus einer bestimmten Log-Datei lesen

### Logfile-Browser

Ganz unten auf der Seite gibt es eine ausklappbare **„Log-Dateien"**-Sektion. Dort siehst du alle vorhandenen Log-Dateien (mit Größe und letzter Änderung) und kannst für jede einzelne die letzten N Zeilen als Tail anzeigen lassen — nützlich wenn du gezielt in einem bestimmten Tag schauen willst.

## Fehler als Markdown kopieren

In **APP_ENV=development** bekommst du zusätzlich zur normalen Fehlerseite einen **„Als Markdown kopieren"**-Button im Header der Dev-Error-Page. Ein Klick und du hast einen komplett formatierten Bug-Report in der Zwischenablage, den du direkt in ein GitHub-Issue, Discord oder Slack einfügen kannst:

```markdown
## PDOException

> SQLSTATE[22007]: Invalid datetime format: 1292 Incorrect date value: '04.04.2026'
> for column `intradev`.`intra_fahrtenbuch`.`datum` at row 1

| Feld | Wert |
|---|---|
| Exception | `PDOException` |
| Code | `22007` |
| Error-ID | `0B29305D` |
| Zeitpunkt | 2026-04-13 02:18:42 |
| Method | `POST` |
| URL | `https://dev.intrarp.de/fahrtenbuch/actions.php` |
| PHP | 8.4.3 |
| intraRP | v1.2.3 |
| APP_ENV | `development` |

### Stack Trace

​```
#0 F:\GitKraken Projects\intraRP\fahrtenbuch\actions.php:102 — PDOStatement::execute()
#1 {main}
​```

### Application Frames

1. `fahrtenbuch\actions.php:102` — PDOStatement::execute()

### Request Data

**POST:**
​```json
{
  "datum": "04.04.2026"
}
​```
```

Direkt paste-fähig in GitHub-Issues, Discord (rendert Markdown inline), Slack und andere Tools.

## Support mit Error-ID + Telemetrie kombinieren

Die stärkste Kombination für Support-Anfragen ist:

1. Error-ID aus der User-Fehlermeldung notieren
2. In deiner intraRP-Instanz das Fehlerprotokoll öffnen und die ID lookup-en
3. Die Fehlergruppe anschauen — ist das ein Einzelfall oder schon 50× aufgetreten?
4. Falls unklar wie weiter: im Discord mit `/telemetry connect <UUID>` verbinden (siehe [Telemetrie & Support](telemetrie-support.md))
5. Das Support-Team kann dann direkt auf denselben Fehler mit denselben Daten zugreifen

## Log-Retention

Das Fehlerprotokoll zeigt Daten aus den **rotierenden Monolog-Files** unter `storage/logs/`:

- `error-*.log` — alle WARNING und höher, 90 Tage Retention
- `app-*.log` — alle Log-Einträge ab Debug-Level, 30 Tage Retention

Ältere Einträge werden automatisch weggerotiert — der Disk-Verbrauch bleibt überschaubar.

Wenn du einen Fehler aus einer rotierten Datei suchen musst, kannst du sie aus einem Backup wiederherstellen und in `storage/logs/` ablegen — das Fehlerprotokoll erkennt sie automatisch beim nächsten Seitenaufruf.
