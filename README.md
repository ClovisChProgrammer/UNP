# UNT — Ultimate Note Pad · Manual (English)

**English** · [Português (BR)](README.pt-BR.md) · [Español](README.es.md)

![Version](https://img.shields.io/badge/version-0.2.0-blue)
![Chrome](https://img.shields.io/badge/Chrome-114%2B-4285F4?logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Offline](https://img.shields.io/badge/100%25-offline-brightgreen)

**A pen-first scratchpad in Chrome's side panel.** Quick notes, math calculations and
sketches with your digital pen — no accounts, no cloud, no tracking.

---

## About

**UNT (Ultimate Note Pad)** is an extension for Chrome-based browsers that turns the
side panel into a sheet of digital paper: write with your tablet's stylus, erase,
undo, and export as an image. Everything runs **locally on your machine** — no data
ever leaves it.

Built for anyone with a **digital pen (stylus) connected to their PC** who wants to
jot something down in 2 seconds without opening another program.

## Features

- **Side panel with instant toggle** — click the extension icon to open/close
- **Pressure-sensitive ink** — stroke width follows your pen's pressure
- **Palm rejection** — your palm won't draw or erase while the pen is in use
- **Full screen** — the *↗ Full screen* button or `Ctrl+Shift+U` opens the editor in its own tab
- **Essential tools** — 3 colors, 2 widths, eraser, undo (`Ctrl+Z`) and clear
- **PNG & JPG export** — one click downloads a timestamped image
- **100% offline** — works without internet; nothing is collected or sent anywhere

## Requirements

- Google Chrome 114 or newer (or equivalent Chromium/Edge/Vivaldi browsers)
- A pen tablet is optional — a mouse works too

## Installation (developer mode)

1. Download or clone this repository to a permanent folder on your computer
2. Open `chrome://extensions` in the address bar
3. Turn on **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the project folder
5. Done — the UNT icon appears in Chrome's toolbar

> **Tip:** don't delete the folder after installing — Chrome loads the extension from
> it. To update, download the new version and click *Update* on the extension card.

## Usage

| Action | How |
|--------|-----|
| Open/close the pad | Click the UNT icon in the toolbar |
| Write | Touch the panel with your pen (or click with the mouse) |
| Change color/width | Buttons in the toolbar |
| Erase | **Eraser** (removes strokes without clearing the rest) |
| Undo | **Undo** or `Ctrl+Z` |
| Clear all | **Clear** (also undoable with `Ctrl+Z`) |
| Full screen | **↗ Full screen** button or `Ctrl+Shift+U` |
| Download image | **PNG** or **JPG** buttons |

**Full screen:** if the panel holds a drawing when you open the tab, the drawing is
**copied once** into the full-screen editor (a notice appears in the footer). After
that, panel and tab are independent — drawing in one does not change the other.

The `Ctrl+Shift+U` shortcut can be remapped at `chrome://extensions/shortcuts`.

## Privacy

- **Zero data collection.** The extension sends nothing to any server — there is none
- **100% offline.** No network permission, no tracking, no cookies
- Permissions used: `sidePanel` (the panel) and `storage` (local preferences)
- The code is open — audit freely

## Known limitations (v0.2)

- Drawings are not persisted between Chrome sessions (saving is on the roadmap)
- When the panel is resized, the drawing is kept undistorted in the top-left corner
- PDF export and OCR (handwriting → text) are not available yet

## Roadmap

- [x] Side panel with pressure-sensitive pen input
- [x] Full-screen tab mode (`Ctrl+Shift+U`)
- [ ] TXT and PDF export
- [ ] OCR handwriting → text (processed locally)
- [ ] Persist drawings between sessions
- [ ] Chrome Web Store publication

## License

MIT — see [LICENSE](LICENSE). Free to use, modify and distribute.
