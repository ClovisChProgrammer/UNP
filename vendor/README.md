# Vendored OCR assets

Files in this folder are third-party, bundled locally so the extension works **fully
offline** (no CDN — required by Chrome Web Store policy for MV3 extensions).

## Contents

| Folder | Package | Version | License |
|--------|---------|---------|---------|
| `tesseract/` | [tesseract.js](https://github.com/naptha/tesseract.js) | 7.0.0 | Apache-2.0 (`tesseract/LICENSE.md`) |
| `core/` | [tesseract.js-core](https://github.com/naptha/tesseract.js-core) | 6.1.2 | Apache-2.0 (`core/LICENSE`) |
| `lang/` | `@tesseract.js-data/{eng,por}` (`4.0.0_best_int`) | 4.0.0 | Apache-2.0 (Tesseract traineddata) |

The bundled language files are `eng.traineddata.gz` and `por.traineddata.gz`.

## Local patch applied (documented for reproducibility)

`tesseract/worker.min.js` was patched to remove a reference to a file that does **not**
exist in `tesseract.js-core@6.1.2`. Upstream `getCore` selects
`tesseract-core-relaxedsimd[-lstm].wasm.js` when the browser reports relaxed-SIMD
support; those files are not shipped, which would cause a 404 when running offline.

The patch redirects the relaxed-SIMD branch to the shipped SIMD build
(`tesseract-core-simd[-lstm].wasm.js`) — SIMD is universally supported in current
browsers, so relaxed-SIMD detection is only a minor optimization, not a requirement.

To reproduce/refresh:

```text
npm pack tesseract.js@7.0.0 tesseract.js-core@6.1.2
# extract, copy dist/*.js, core/*.wasm(.js), then apply the string replacement
# relaxedsimd-lstm.wasm.js -> simd-lstm.wasm.js  and  relaxedsimd.wasm.js -> simd.wasm.js
```

## Rebuilding the language data

```text
https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz
https://cdn.jsdelivr.net/npm/@tesseract.js-data/por/4.0.0_best_int/por.traineddata.gz
```

The runtime expects these gzip files and decompresses them in the worker (`gzip: true`).
