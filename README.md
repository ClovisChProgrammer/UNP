# UNT — Ultimate Note Pad · Manual (English)

**English** · [Português (BR)](README.pt-BR.md) · [Español](README.es.md)

![Version](https://img.shields.io/badge/version-0.5.1-blue)
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
- **Text box** — the *Text* button reveals a typing area (Ctrl+Z undoes edits inside it)
- **Essential tools** — 3 colors, 2 widths, eraser, undo (`Ctrl+Z`) and clear
- **4 export formats** — `PNG`, `JPG`, `PDF` (single page) and `TXT` (typed text), one click each
- **Auto-saved scratchpad** — whatever you draw or type is kept and restored when you reopen Chrome
- **Offline OCR (experimental)** — reads the text in your drawing without sending anything to the cloud (bundled Tesseract)
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
| Type text | **Text** button (reveals the text area) |
| Download text as TXT | **TXT** button |
| Download drawing as PDF | **PDF** button (single page) |
| Download image | **PNG** or **JPG** buttons |
| Delete the saved draft | **Delete draft** button (clears the canvas and stays gone) |
| Recognize text in the drawing | **OCR** button (opens the panel with the recognized text) |

**Full screen:** if the panel holds a drawing (and/or text) when you open the tab, the
content is **copied once** into the full-screen editor (a notice appears in the footer).
After that, panel and tab are independent — drawing in one does not change the other.

The `Ctrl+Shift+U` shortcut can be remapped at `chrome://extensions/shortcuts`.

**Auto-save:** your drawing and text are saved on their own (after a short delay) and
restored when you reopen the panel or Chrome. There is no "Save" button — just write
and forget. The **Delete draft** button clears the canvas **and** the stored draft.

**OCR (experimental):** the **OCR** button reads the text in your drawing with the
Tesseract engine **bundled inside the extension** — processing is 100% local, nothing is
sent. The panel shows the text, an estimated confidence and **Copy** / **→ Text** buttons
(sends it to the text box). It works well on **printed text and block letters**;
**connected cursive is poor** (a Tesseract limitation, not the extension's). Always
review the result before using it.

## Privacy

- **Zero data collection.** The extension sends nothing to any server — there is none
- **100% offline.** No network permission, no tracking, no cookies
- Permissions used: `sidePanel` (the panel) and `storage` (local preferences)
- Your drafts live **only in your browser** (`chrome.storage.local`) — nothing goes to the cloud
- OCR runs on your machine with the bundled Tesseract engine — **no image is ever uploaded**
- The code is open — audit freely

## Known limitations (v0.5.1)

- When the panel is resized, the drawing is kept undistorted in the top-left corner
- The text box is an overlay on the lower part of the canvas (it does not split the view)
- The PDF is a single page with the drawing as an image (not selectable text)
- Very large drafts (above ~8 MB) are not saved — export as an image in that case
- **OCR:** great on printed text and block letters; **poor on connected cursive**
  and **cannot read math symbols** (`+`, `^`, `=` are absent from the model — a
  Tesseract limitation, not a bug). The first OCR run loads the engine (~1–2 s).
  See [ADR-0001](docs/adr/0001-limites-do-ocr.md) for the full analysis.

## Roadmap

- [x] Side panel with pressure-sensitive pen input
- [x] Full-screen tab mode (`Ctrl+Shift+U`)
- [x] TXT and PDF export
- [x] Auto-saved drafts (restored on reopen)
- [x] Offline OCR of the drawing (bundled Tesseract; printed/block)
- [ ] Chrome Web Store publication

## Smoke checklist — step 2 (TXT + PDF export)

- [ ] **Text** button toggles the text box; typing works and Ctrl+Z undoes inside the box
- [ ] **TXT** downloads a `.txt` with the typed text (accents preserved)
- [ ] **PDF** downloads `unt_<stamp>.pdf` that opens with the drawing visible
- [ ] PDF page size matches the editor (no cropping or distortion)
- [ ] With an empty canvas, PDF shows "Nothing to export" (no file)
- [ ] `npm test` passes (pdf generator unit tests)

## Smoke checklist — step 4 (auto-saved drafts)

- [ ] Draw something, close the panel, reopen it → the drawing comes back ("Draft restored")
- [ ] Fully quit and relaunch Chrome → the draft is still there
- [ ] Type text, reopen → text and its visibility are restored
- [ ] Change color/width, reopen → the tool selection is restored
- [ ] **Delete draft** clears canvas + text and stays empty after reopening
- [ ] Draw in panel, open the tab → copy works; panel redraws persist independently
- [ ] Undo and Clear are also auto-saved

## Smoke checklist — step 5 (offline OCR)

- [ ] First **OCR** click loads the engine locally (progress "Loading OCR engine…") — no network
- [ ] Printed text and BLOCK letters are recognized correctly (~90%+ confidence)
- [ ] Connected cursive returns poor results (expected — documented limitation)
- [ ] **Copy** puts the text on the clipboard; **→ Text** sends it to the text box
- [ ] **Close** hides the panel; empty canvas shows a clear "nothing to recognize" message
- [ ] Works with DevTools offline mode ON (proves no CDN dependency)

## License

MIT — see [LICENSE](LICENSE). Free to use, modify and distribute.
