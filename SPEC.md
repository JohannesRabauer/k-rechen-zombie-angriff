# 🧟 Rechen-Zombie-Angriff – Spezifikation

## 1. Überblick

**Rechen-Zombie-Angriff** ist ein browserbasiertes Endlos-Spiel, bei dem Spieler Rechenaufgaben lösen, um angreifende Zombies abzuwehren. Das Spiel wird als statische Single-Page-Anwendung (HTML/CSS/JS) über GitHub Pages bereitgestellt.

**Motto:** „Löse die Aufgaben, besiege die Zombies und überlebe so lange wie möglich!" 🧟🎮🧠🏆

---

## 2. Spielziel

Das Spiel hat **kein Ende** – es ist ein Endlos-Spiel. Ziel ist es, so lange wie möglich zu überleben und den persönlichen Punkterekord zu verbessern.

---

## 3. Technologie

| Aspekt | Technologie |
|--------|-------------|
| Sprache | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Deployment | GitHub Pages via GitHub Actions |
| Abhängigkeiten | Keine (keine externen Libraries) |
| Browser-Support | Moderne Browser (Chrome, Firefox, Safari, Edge) |
| Responsiv | Ja – spielbar auf Desktop und Mobilgeräten |

---

## 4. Spielmechanik

### 4.1 Leben

- Spieler startet mit **3 Leben** (❤️❤️❤️)
- Bei falsch beantworteter Aufgabe oder Zeitablauf: **-1 Leben**
- Bei 0 Leben: **Game Over**

### 4.2 Spielablauf

1. Spiel startet mit Startbildschirm (Titel, Spielregeln-Zusammenfassung, Start-Button)
2. Nach Start erscheint der erste Zombie mit einer Rechenaufgabe
3. Spieler gibt Antwort in ein Eingabefeld ein und bestätigt mit Enter oder Button
4. Bei richtiger Antwort: Zombie wird besiegt, Punkte werden vergeben, nächster Zombie erscheint
5. Bei falscher Antwort: Spieler verliert 1 Leben, nächster Zombie erscheint
6. Bei Zeitablauf (15 Sekunden): Spieler verliert 1 Leben, nächster Zombie erscheint
7. Bei 0 Leben: Game-Over-Bildschirm mit Punktestand und Highscore

### 4.3 Timer

- Jeder Zombie hat einen **15-Sekunden-Countdown**
- Timer wird visuell als Fortschrittsbalken angezeigt
- Farbe wechselt: Grün (>10s) → Gelb (5-10s) → Rot (<5s)
- Bei Ablauf: automatischer Lebensverlust

### 4.4 Eingabe

- Numerisches Eingabefeld (akzeptiert auch negative Zahlen)
- Bestätigung per **Enter-Taste** oder **"Schießen!"-Button**
- Eingabefeld wird nach jeder Aufgabe automatisch geleert und fokussiert

---

## 5. Gegnertypen

| Typ | Emoji | Erscheint ab | Punkte | Aufgabentyp |
|-----|-------|-------------|--------|-------------|
| Normaler Zombie | 🧟 | 0 Punkte | 10 | Addition & Subtraktion (leicht) |
| Schneller Zombie | 🧟‍♂️ | 50 Punkte | 20 | Addition & Subtraktion (schwer) |
| Panzer-Zombie | 💀 | 100 Punkte | 30 | Multiplikation & Division |
| Boss-Zombie | 👑 | 200 Punkte | 50 | Gemischte schwere Aufgaben |

### 5.1 Aufgaben-Schwierigkeit pro Typ

#### Normaler Zombie (🧟) – 10 Punkte
- Addition: `a + b` wobei a, b ∈ [1, 20]
- Subtraktion: `a - b` wobei a ∈ [5, 20], b ∈ [1, a] (Ergebnis ≥ 0)

#### Schneller Zombie (🧟‍♂️) – 20 Punkte
- Addition: `a + b` wobei a, b ∈ [10, 50]
- Subtraktion: `a - b` wobei a ∈ [20, 50], b ∈ [1, a]

#### Panzer-Zombie (💀) – 30 Punkte
- Multiplikation: `a × b` wobei a ∈ [2, 12], b ∈ [2, 12]
- Division: `a ÷ b` wobei Ergebnis ganzzahlig, a ∈ [4, 144], b ∈ [2, 12]

#### Boss-Zombie (👑) – 50 Punkte
- Gemischte Operationen: `a ○ b ○ c` (zwei Operationen)
- Zahlenbereich: [2, 20]
- Operationen: +, -, ×
- Ergebnis immer ganzzahlig und ≥ 0

---

## 6. Schwierigkeitssteigerung

Die Schwierigkeit steigt kontinuierlich basierend auf dem aktuellen Punktestand:

| Punktestand | Zombie-Pool | Timer |
|-------------|-------------|-------|
| 0–49 | nur 🧟 | 15s |
| 50–99 | 🧟 (70%), 🧟‍♂️ (30%) | 14s |
| 100–199 | 🧟 (40%), 🧟‍♂️ (35%), 💀 (25%) | 13s |
| 200–299 | 🧟 (20%), 🧟‍♂️ (30%), 💀 (30%), 👑 (20%) | 12s |
| 300+ | 🧟 (10%), 🧟‍♂️ (25%), 💀 (35%), 👑 (30%) | 10s |

---

## 7. Punktesystem

| Aktion | Punkte |
|--------|--------|
| Normaler Zombie besiegt | +10 |
| Schneller Zombie besiegt | +20 |
| Panzer-Zombie besiegt | +30 |
| Boss-Zombie besiegt | +50 |
| Falsche Antwort | 0 (kein Punktabzug) |
| Zeitablauf | 0 (kein Punktabzug) |

### 7.1 Highscore

- Der Highscore wird im **localStorage** gespeichert
- Wird beim Game-Over angezeigt zusammen mit dem aktuellen Score
- Neuer Highscore wird visuell hervorgehoben (z.B. "🏆 Neuer Rekord!")

---

## 8. Benutzeroberfläche

### 8.1 Bildschirme

1. **Startbildschirm**
   - Spieltitel: "🧟 Rechen-Zombie-Angriff"
   - Kurze Spielanleitung
   - "Spiel starten"-Button

2. **Spielbildschirm**
   - Header: Leben (❤️) + Punktestand
   - Zombie-Bereich: Emoji des aktuellen Zombies + Aufgabe
   - Timer-Balken
   - Eingabefeld + "Schießen!"-Button
   - Feedback-Bereich (richtig/falsch Animation)

3. **Game-Over-Bildschirm**
   - "Game Over" Überschrift
   - Erreichte Punkte
   - Highscore (mit Hinweis auf neuen Rekord)
   - "Nochmal spielen"-Button

### 8.2 Design

- Dunkles Theme (passend zum Zombie-Thema)
- Hintergrundfarbe: Dunkelgrün/Schwarz
- Schrift: Monospace oder Horror-ähnlich (system-fonts)
- Animationen: Zombie-Erscheinen (CSS-Animation), Treffer-Feedback, Schadens-Feedback
- Farbschema: Grün (Zombies), Rot (Schaden), Gold (Punkte)

### 8.3 Responsive Design

- Mindestbreite: 320px (Smartphone)
- Maximale Content-Breite: 600px (zentriert)
- Touch-freundliche Button-Größen (min. 44x44px)

---

## 9. Visuelle Effekte & Feedback

| Ereignis | Visuelles Feedback |
|----------|-------------------|
| Richtige Antwort | Grüner Flash + "💥 Getroffen!" Text + Zombie verschwindet |
| Falsche Antwort | Roter Shake-Effekt + "🩸 Verfehlt!" Text |
| Zeitablauf | Roter Shake-Effekt + "⏰ Zu langsam!" Text |
| Neuer Zombie | Slide-In Animation von rechts |
| Game Over | Bildschirm-Fade + Totenkopf |
| Neuer Highscore | Gold-Glitzer-Animation + "🏆 Neuer Rekord!" |

---

## 10. Audio (optional, nur visuell in V1)

In Version 1 wird auf Audio verzichtet. Feedback erfolgt rein visuell.

---

## 11. Projektstruktur

```
k-rechen-zombie-angriff/
├── index.html          # Hauptseite (Single Page)
├── style.css           # Styling
├── game.js             # Spiellogik
├── SPEC.md             # Diese Spezifikation
├── README.md           # Projektbeschreibung
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions für Pages Deployment
```

---

## 12. Deployment

### GitHub Actions Workflow

- **Trigger:** Push auf `main` Branch
- **Job:** Statische Dateien direkt als GitHub Pages Artifact deployen
- **Methode:** `actions/upload-pages-artifact` + `actions/deploy-pages`
- **URL:** `https://johannesrabauer.github.io/k-rechen-zombie-angriff/`

---

## 13. Akzeptanzkriterien

- [ ] Spiel startet im Browser ohne Fehler
- [ ] Startbildschirm mit Spielanleitung und Start-Button
- [ ] Zombies erscheinen mit Rechenaufgaben
- [ ] Timer läuft von 15s (bzw. angepasst) herunter
- [ ] Richtige Antwort: Punkte + nächster Zombie
- [ ] Falsche Antwort: Leben -1 + Feedback
- [ ] Zeitablauf: Leben -1 + Feedback
- [ ] Game Over bei 0 Leben
- [ ] Highscore wird gespeichert (localStorage)
- [ ] Schwierigkeit steigt mit Punktestand
- [ ] Alle 4 Zombie-Typen erscheinen korrekt
- [ ] Responsive Design (Mobile + Desktop)
- [ ] GitHub Pages Deployment funktioniert automatisch
- [ ] Eingabe per Enter-Taste möglich
- [ ] Eingabefeld wird nach jeder Aufgabe automatisch fokussiert
