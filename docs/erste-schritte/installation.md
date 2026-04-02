---
title: Installation von intraRP
---

# Installation von intraRP

Du willst intraRP auch für dein Projekt verwenden? Mit dieser ANleitung findest du heruas, welche Schritte dich zu einer anwendbaren Version von intraRP bringen.

!!! tip "Tipp"
    Die gesamte Installation kann auch mittels einer fertigen Setup-Datei übersprungen bzw. einfach und intuitiv durchgeführt werden. Die Setup-Datei kann unter folgende Link heruntergeladen/aufgerufen werden: [EmergencyForge/intraRP-Setup](https://github.com/EmergencyForge/intraRP-Setup)

## Voraussetzungen

Stelle sicher, dass alles [Systemanforderungen](index.md#systemanforderungen) erfüllt sind, bevor du mit der Installation beginnst.

## Manuelle Installation

### 1. Repository klonen

Lade dir die neuste Version von GitHub herunter oder verbinde dich mit deinem Server und navigiere zum gewünschten Installationsverzeichnis:

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
- Discord OAuth Credentials (Client ID, Client Secret)

### 3. Datenbank einrichten

Erstelle eine neue Datenbank und importiere die SQL-Struktur:

```bash
mysql -u root -p
```

In der MYSQL-Konsole:

```sql
CREATE DATABASE intrarp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'intrarp'@'localhost' IDENTIFIED BY 'sicheres-passwort';
GRANT ALL PRIVILEGES ON intrarp.* TO 'intrarp'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Abhängigkeiten installieren

Installiere alle benötigten PHP-Abhängigkeiten mit Composer:

```bash
composer install --no-dev
```

### 5. Installation abschließen

Rufe deine Installation im Browser auf.

## Fehlerbehebung

### "500 Internal Server Error"

**Mögliche Fehler:**

- Falsche Dateiberechtigungen
- Fehler in der `.env`-Datei
- PHP-Erweiterungen fehlen
- Composer wurde nicht oder nicht korrekt ausgeführt

### "Database connection failed"

1. Prüfe deine Datenbankverbindung in der `.env`
2. Stelle sicher, dass Mysql läuft
3. Teste die Verbindung ggf. manuell
