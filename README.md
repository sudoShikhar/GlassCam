# electron_webcam

[![Build & Release](https://github.com/sudoShikhar/electron_webcam/actions/workflows/build.yml/badge.svg)](https://github.com/sudoShikhar/electron_webcam/actions/workflows/build.yml)

A lightweight, modern Electron-based webcam application to test and view your camera feed.

## Download for Linux
[![Download Latest](https://img.shields.io/badge/Download-AppImage-blue?style=for-the-badge&logo=linux)](https://github.com/sudoShikhar/electron_webcam/releases/latest)

> **Note for AppImage users:**
> On Ubuntu 22.04 and newer, you may need to install `libfuse2`:
> ```bash
> sudo apt update && sudo apt install -y libfuse2
> ```

## Key Features

- 📷 **Instant Camera Preview**: Fast, low-latency live camera feed built on Electron and web APIs.
- 🔍 **Interactive Zoom Controls**: Mouse wheel scrolling for smooth 1x to 4x zoom adjustments, with single-click zoom reset.
- 🖼️ **Flexible Aspect Ratio Modes**: Seamlessly toggle between `contain` and `cover` object-fit views.
- 🔲 **Frameless Modern Interface**: Sleek dark UI with custom window controls (minimize, maximize, close).
- 📦 **Standalone AppImage Packaging**: Zero-installation portable binary for Linux systems.

## Commands

### Run the Application (Development)
To run the application in development mode:
```bash
npm install
npm start
```

### Build Production AppImage
To compile a lightweight, standalone AppImage binary into `dist/`:
```bash
npm run build
```

### Run the Compiled AppImage
```bash
./dist/WebCam-*.AppImage
```

### Run Unit Tests
To run unit tests and validation checks:
```bash
npm test
```

## 🚀 Automated Releases & CI/CD

Electron Webcam uses GitHub Actions to automatically compile production AppImages and publish releases:
- **Automatic Releases on Push**: Every push to the `main` branch triggers `.github/workflows/build.yml`.
- **Timestamped Executables**: Compiles `dist/WebCam-<TIMESTAMP>.AppImage` binaries and attaches them directly to the GitHub Release.
- **Git Changelog**: Dynamically generates Markdown release notes listing recent commit messages and commit links.
- **Floating `latest` Tag**: Automatically updates the `latest` git tag pointer for effortless downloading.
