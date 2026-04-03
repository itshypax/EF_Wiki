---
title: Startseite
hide:
  - navigation
  - toc
---

<div class="ef-hero" markdown>

<div class="ef-hero__content" markdown>

# intraRP Dokumentation

Die zentrale Wissensbasis für **intraRP** von EmergencyForge.
Setup-Anleitungen, Konfiguration und technische Referenz.
{ .ef-hero__subtitle }

<div class="ef-hero__actions" markdown>

[Quickstart :material-arrow-right:](erste-schritte/index.md){ .md-button .md-button--primary }
[GitHub :material-github:](https://github.com/EmergencyForge/intraRP){ .md-button }
[Discord :material-chat:](https://discord.gg/emergencyforge){ .md-button }

</div>

</div>

</div>

<div class="ef-quicklinks" markdown>

[:material-download: Setup herunterladen](https://github.com/EmergencyForge/intraRP-Setup){ .ef-chip }
[:material-discord: Discord einrichten](erste-schritte/discord-app-erstellen.md){ .ef-chip }
[:material-server: Installation](erste-schritte/installation.md){ .ef-chip }
[:material-api: API-Referenz](dokumentation/api.md){ .ef-chip }

</div>

---

<div class="grid cards" markdown>

- :material-rocket-launch:{ .lg .middle } **Erste Schritte**

    ---

    Systemanforderungen, Discord-Setup und Installation — alles für den Start mit intraRP.

    [:octicons-arrow-right-24: Loslegen](erste-schritte/index.md)

- :material-book-open-variant:{ .lg .middle } **Dokumentation**

    ---

    Technische Dokumentation und API-Referenz.

    [:octicons-arrow-right-24: Zur Dokumentation](dokumentation/index.md)

- :material-account-group:{ .lg .middle } **Mitmachen**

    ---

    Erfahre, wie du zum Projekt und diesem Wiki beitragen kannst.

    [:octicons-arrow-right-24: Mitmachen](mitmachen/beitragen.md)

</div>

---

<div class="ef-requirements" markdown>

## Auf einen Blick

<div class="grid" markdown>

<div markdown>

### Systemanforderungen

| Komponente | Minimum |
|------------|---------|
| PHP | 8.1+ |
| MySQL | 8.0+ / MariaDB 10.6+ |
| Webserver | Apache / NGINX |
| Speicher | 700 MB |
| SSL | Erforderlich |

</div>

<div markdown>

### Schnell installieren

```bash
cd /var/www/
git clone https://github.com/EmergencyForge/intraRP.git
cd intraRP
cp .env.example .env
composer install --no-dev
```

Oder nutze das [Setup-Tool](https://github.com/EmergencyForge/intraRP-Setup) für eine geführte Installation.

</div>

</div>

</div>
