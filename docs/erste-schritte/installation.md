---
title: Installation von intraRP
---

# Installation von intraRP

Du willst intraRP auch für dein Projekt verwenden? Mit dieser Anleitung findest du heraus, welche Schritte dich zu einer anwendbaren Version von intraRP bringen.

!!! tip "Setup-Tool verwenden"
    Die gesamte Installation kann auch mittels einer fertigen Setup-Datei einfach und intuitiv durchgeführt werden: [EmergencyForge/intraRP-Setup](https://github.com/EmergencyForge/intraRP-Setup)

## Voraussetzungen

Stelle sicher, dass alle [Systemanforderungen](index.md#systemanforderungen) erfüllt sind, bevor du mit der Installation beginnst.

## Manuelle Installation

### 1. Repository klonen

Verbinde dich mit deinem Server und navigiere zum gewünschten Installationsverzeichnis:

```bash
cd /var/www/
git clone https://github.com/EmergencyForge/intraRP.git
cd intraRP
```

### 2. Konfiguration

Kopiere die Beispiel-Konfigurationsdatei und passe sie an:

```bash
cp .env.example .env
nano .env
```

Trage folgende Informationen ein:

- Datenbankverbindung (Host, Name, Benutzer, Passwort)
- Discord OAuth Credentials (Client ID, Client Secret) — siehe [Discord-Applikation erstellen](discord-app-erstellen.md)

### 3. Datenbank einrichten

Erstelle eine neue Datenbank und einen Benutzer:

=== ":material-database: MySQL"

    ```sql
    CREATE DATABASE intrarp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER 'intrarp'@'localhost' IDENTIFIED BY 'sicheres-passwort';
    GRANT ALL PRIVILEGES ON intrarp.* TO 'intrarp'@'localhost';
    FLUSH PRIVILEGES;
    ```

=== ":material-database-outline: MariaDB"

    ```sql
    CREATE DATABASE intrarp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER 'intrarp'@'localhost' IDENTIFIED BY 'sicheres-passwort';
    GRANT ALL PRIVILEGES ON intrarp.* TO 'intrarp'@'localhost';
    FLUSH PRIVILEGES;
    ```

!!! danger "Sicherheit"
    Verwende ein starkes Passwort und **nicht** den Platzhalter `sicheres-passwort`.

### 4. Abhängigkeiten installieren

```bash
composer install --no-dev
```

### 5. Installation abschließen

Rufe deine Installation im Browser auf und folge den Anweisungen.

## Fehlerbehebung

??? failure "500 Internal Server Error"
    **Mögliche Ursachen:**

    - Falsche Dateiberechtigungen
    - Fehler in der `.env`-Datei
    - PHP-Erweiterungen fehlen
    - Composer wurde nicht oder nicht korrekt ausgeführt

    **Lösung:** Prüfe die Server-Logs unter `/var/log/apache2/error.log` oder `/var/log/nginx/error.log`.

??? failure "Database connection failed"
    1. Prüfe deine Datenbankverbindung in der `.env`
    2. Stelle sicher, dass MySQL/MariaDB läuft: `systemctl status mysql`
    3. Teste die Verbindung manuell: `mysql -u intrarp -p intrarp`

## Nächste Schritte

Nach erfolgreicher Installation kannst du dich über Discord einloggen und mit der Konfiguration beginnen.
