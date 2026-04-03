---
title: Erste Schritte
---

# Erste Schritte

Hier findest du alles, um mit intraRP loszulegen.

## Systemanforderungen

!!! warning "Achtung"
    Windows wird von uns aktuell nicht offiziell für die Installation bzw. Nutzung von intraRP unterstützt. Wann und ob eine Unterstützung stattfindet ist unklar.

Um intraRP erfolgreich betrieben zu können, müssen folgende Anforderungen erfüllt sein:

### 1. Webserver

| Komponente | Anforderung |
|------------|-------------|
| Webserver | Apache oder NGINX |
| PHP | Version 8.1 oder höher |
| Datenbank | MySQL 8.0+ oder MariaDB 10.6+ |

!!! note "Hinweis"
    Composer wird ab Version 0.8.0.0 nicht mehr zwingend vorausgesetzt — die neuste Setup-Installation liefert alle nötigen Dependencies mit. **Für Installationen OHNE das Setup wird weiterhin Composer benötigt!**

### 2. Speicherplatz

- **Minimum:** 700 MB freier Speicherplatz
- **Empfohlen:** 2 GB oder mehr

### 3. Weitere Anforderungen

- SSL-Zertifikat und Domain (zwingend erforderlich)
- Discord-Applikation für Authentifizierung

## Installationsmethode wählen

=== ":material-wizard-hat: Setup-Tool (Empfohlen)"

    Das Setup-Tool führt dich automatisch durch die gesamte Installation.

    1. [Discord-Applikation erstellen](discord-app-erstellen.md)
    2. Setup-Datei herunterladen: [EmergencyForge/intraRP-Setup](https://github.com/EmergencyForge/intraRP-Setup)
    3. Setup im Browser aufrufen und den Anweisungen folgen

=== ":material-console: Manuelle Installation"

    Für erfahrene Nutzer oder spezielle Server-Setups.

    1. [Discord-Applikation erstellen](discord-app-erstellen.md)
    2. [Manuelle Installation](installation.md) durchführen
