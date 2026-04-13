---
title: Telemetrie & Support
---

# Telemetrie & Support

intraRP enthält ein optionales Telemetrie-System, das deine Installation eindeutig identifiziert und dem Support-Team ermöglicht, dir bei Problemen schneller und gezielter zu helfen.

Alle Daten werden **anonym** erfasst — keine persönlichen Informationen, keine IP-Adressen, keine Namen.

## Die Installations-UUID

Jede intraRP-Installation bekommt beim ersten Start automatisch eine eindeutige UUID zugewiesen. Diese UUID ist:

- **Zufällig generiert** (kryptografisch sicher via `random_bytes`)
- **Persistent** — einmal erzeugt, bleibt sie über Updates, Umzüge und DB-Backups erhalten
- **Anonym** — enthält keine Rückschlüsse auf Betreiber, Server oder Daten
- **Einzigartig** — kollidiert statistisch nie mit einer anderen Installation

Die UUID sieht beispielsweise so aus:

```
f2f608e5-a3f4-4f79-87bb-1d37ad7f8941
```

### Wo du deine UUID findest

Öffne in deiner intraRP-Instanz:

**Einstellungen → System → Telemetrie & Ankündigungen**

Direkt oben auf der Seite siehst du einen Banner mit der Überschrift **„Support & Telemetrie — Deine Installations-UUID"**. Die UUID selbst ist standardmäßig ausgeblendet — ein Klick auf **„Einblenden"** macht sie sichtbar, ein zweiter Klick auf **„Kopieren"** legt sie in die Zwischenablage.

!!! tip "Warum versteckt?"
    Die UUID ist per Default verborgen, damit sie bei Screenshots, Bildschirm-Sharing oder Stream-Aufnahmen nicht versehentlich öffentlich sichtbar wird. Im Status-Panel weiter unten ist sie zusätzlich unscharf dargestellt und wird erst beim Hover über das Feld lesbar.

## Support über Discord

Wenn du im [EmergencyForge-Discord](https://discord.gg/emergencyforge) um Hilfe bittest, kannst du deine Installation direkt mit dem Support-System verknüpfen:

```
/telemetry connect <UUID> [label]
```

- **`<UUID>`** — deine Installations-UUID aus dem Banner
- **`[label]`** — optional: ein kurzer Name für deine Instanz (z.B. `Hauptserver`, `Test-Wache`), damit du mehrere Installationen unterscheiden kannst

Nach erfolgreichem Connect kann das Support-Team:

- Deine intraRP-Version und PHP-Version einsehen
- Installations-Statistiken (Anzahl Protokolle, Einsätze, Mitarbeiter — rein numerisch, keine Inhalte)
- Modul-Konfiguration prüfen (welche Features sind aktiv, welche deaktiviert)
- Deine Error-IDs zu echten Stack-Traces auflösen (siehe [Fehlerprotokoll](fehlerprotokoll.md))

Das spart dir und dem Support-Team viel Hin-und-Her und ermöglicht gezielte Hilfestellung.

!!! warning "Keine sensiblen Daten"
    Über die Telemetrie werden **niemals** Namen, Adressen, Protokoll-Inhalte, Charaktere oder ähnliches übermittelt. Das Support-Team sieht nur technische Metadaten — genug für Fehlerdiagnose, zu wenig für Datenschutz-Bedenken.

## Telemetrie aktivieren oder deaktivieren

Direkt unter dem Support-Banner findest du die **„Telemetrie"**-Karte. Dort kannst du jederzeit:

- **Aktivieren / Deaktivieren** — ein Klick reicht
- **Jetzt senden** — manueller Heartbeat, falls du nach einem Update testen willst ob die Verbindung noch steht
- **Datenvorschau anzeigen** — zeigt dir den vollständigen JSON-Payload, der bei einem Heartbeat übermittelt würde. Volle Transparenz, keine versteckten Felder

Im Status-Bereich siehst du deinen letzten Heartbeat-Zeitpunkt und den verwendeten Hub-Server (standardmäßig `https://emergencyforge.de`).

## Was wird übermittelt?

Klick auf **„Datenvorschau anzeigen"** zeigt dir exakt, was übermittelt würde. Grob:

| Kategorie | Inhalt |
|---|---|
| Installation | UUID, Version, PHP-Version, Timestamp |
| System | Server-Name, System-Name, Org-Typ, DB-Version |
| Statistiken | Anzahl Mitarbeiter, Einsätze, Protokolle (nur Zahlen) |
| Module | Welche intraRP-Module aktiv sind |

**Nicht übermittelt:** Namen, Adressen, Passwörter, Session-Daten, Protokoll-Inhalte, Charakter-Daten, konkrete Datenbank-Inhalte, IP-Adressen von Nutzern.

## Telemetrie ausschalten

Wenn du keine Telemetrie möchtest, klick in der Telemetrie-Karte einfach auf **„Deaktivieren"**. Ab diesem Moment werden keine Heartbeats mehr gesendet.

**Wichtig:** Die Installations-UUID bleibt erhalten, auch wenn Telemetrie deaktiviert ist. Du kannst sie weiterhin für Support-Anfragen nutzen — der Discord-Bot akzeptiert sie unabhängig vom Telemetrie-Status, weil sie nur eine Kennung ist, keine Übertragung.
