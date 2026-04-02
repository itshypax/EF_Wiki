---
title: Discord-Applikation erstellen
---

# Discord-Applikation erstellen

Für intraRP wird Discord als Methode zur Benutzer-Authentifizierung verwendet. Hierfür wird eine Applikation mit einer bestimmten Konfiguration benötigt.

## Discord-Appplikation erstellen und konfigurieren

### 1. Neue Applikation erstellen

1. Öffne das [Discord Developers Portal](https://discord.com/developers/applications) und klicke auf „New Application".
2. Gib dort den gewünschten Namen deiner Applikation ein.

### 2. OAuth2 konfigurieren

1. Klicke links in der Auswahl auf den Tab „OAuth2".
2. Kopiere die Client-ID und lasse dir einen neuen Client-Secret (über die Funktion „Reset Secret") generieren.
3. Füge diese beiden entsprechend in dein `.env`-Datei oder im Setup an der jeweiligen Stelle ein:

```env
DISCORD_CLIENT_ID=deine-client-id
DISCORD_CLIENT_SECRET=dein-client-secret
```

### 3. Redirect URL einrichten

Auf derselben Seite („OAuth2") unter „Redirects" musst du die Callback-URL deiner Seite hinterlegen. Gib hierfür die URL deiner Seite (mit `https://`) und dem Pfad `/auth/callback.php` an.

Beispiel: `https://intrarp.de/auth/callback.php`

## Häufige Probleme

### "Invalid OAuth2 redirect_uri"

Stelle sicher, dass die Redirect-URL exakt mit der eingetragenen URL übereinstimmt:

- Protokoll muss stimmen (`http` vs. `https`)
- Keine zusätzlichen Slashes
- Pfad muss exakt übereinstimmen

### Client Secret funktioniert nicht

Falls du einen Fehler beim Login erhältst:

1. Generiere einen neuen Client Secret im [Discord Developers Portal](https://discord.com/developers/applications)
2. Aktualisiere die `.env`-Datei
3. Versuche es erneut

## Nächste Schritte

1. [Installation](installation.md)
