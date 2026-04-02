---
title: Wiki bearbeiten
tags:
  - Fertig
---

# Wiki bearbeiten

Dieses Wiki basiert auf [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) und wird ueber GitHub Pages bereitgestellt. Alle Inhalte sind einfache Markdown-Dateien im `docs/`-Ordner.

## Direkt auf GitHub bearbeiten

1. Klicke auf den :material-pencil: **Bearbeiten-Button** oben rechts auf einer Wiki-Seite
2. Du wirst zur entsprechenden Datei auf GitHub weitergeleitet
3. Nimm deine Aenderungen vor
4. Klicke auf **"Propose changes"** — das erstellt automatisch einen Pull Request
5. Nach dem Review wird die Aenderung uebernommen und das Wiki aktualisiert sich automatisch

## Lokal bearbeiten

Falls du groessere Aenderungen machen moechtest:

```bash
# Repository klonen
git clone https://github.com/EmergencyForge/Wiki.git
cd Wiki

# Python-Abhaengigkeiten installieren
pip install -r requirements.txt

# Lokalen Dev-Server starten
mkdocs serve
```

Das Wiki ist dann unter `http://localhost:8000` erreichbar und aktualisiert sich bei Aenderungen automatisch.

## Neue Seite anlegen

1. Erstelle eine neue `.md`-Datei im passenden Unterordner von `docs/`
2. Fuege am Anfang der Datei einen Titel und Tags hinzu:

    ```markdown
    ---
    title: Mein neuer Artikel
    tags:
      - Neu
    ---

    # Mein neuer Artikel

    Hier kommt der Inhalt...
    ```

3. Trage die Seite in der `mkdocs.yml` unter `nav:` ein

## Status-Tags

Jede Seite kann mit Status-Tags versehen werden:

| Tag | Bedeutung |
|-----|-----------|
| <span class="status status-neu">Neu</span> | Seite wurde neu angelegt |
| <span class="status status-wip">In Arbeit</span> | Inhalte werden gerade erstellt |
| <span class="status status-fertig">Fertig</span> | Seite ist vollstaendig |
| <span class="status status-veraltet">Veraltet</span> | Inhalte muessen aktualisiert werden |

## Nuetzliche Formatierung

MkDocs Material unterstuetzt viele nuetzliche Extras:

### Hinweisboxen

```markdown
!!! info "Titel"
    Hier steht eine Information.

!!! warning "Achtung"
    Hier steht eine Warnung.

!!! tip "Tipp"
    Hier steht ein nuetzlicher Tipp.
```

### Code-Bloecke

````markdown
```python
print("Hello EmergencyForge!")
```
````

### Tabellen

```markdown
| Spalte 1 | Spalte 2 |
|----------|----------|
| Wert A   | Wert B   |
```
