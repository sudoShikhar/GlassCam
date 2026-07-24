# electron_webcam

[![Build & Release](https://github.com/sudoShikhar/electron_webcam/actions/workflows/build.yml/badge.svg)](https://github.com/sudoShikhar/electron_webcam/actions/workflows/build.yml)

A lightweight, modern Electron-based webcam application to test and view your camera feed.

## Download for Linux
[![Download .deb](https://img.shields.io/badge/Download-.deb-blue?style=for-the-badge&logo=ubuntu)](https://github.com/sudoShikhar/electron_webcam/releases/latest)
[![Download AppImage](https://img.shields.io/badge/Download-AppImage-blue?style=for-the-badge&logo=linux)](https://github.com/sudoShikhar/electron_webcam/releases/latest)

### Installation Options

#### Option 1: Native `.deb` Package (Recommended for Ubuntu / Debian)
Double-click the downloaded `.deb` installer to open in Ubuntu Software Center, or install via terminal:
```bash
sudo apt install ./WebCam-*.deb
```
Once installed, **WebCam** will automatically register system icons and appear directly in your Application Launcher menu search.

#### Option 2: Portable AppImage
Make executable and run:
```bash
chmod +x ./WebCam-*.AppImage
./WebCam-*.AppImage
```

> **Note for AppImage users:**
> - **Ubuntu 22.04+**: Install `libfuse2`:
>   ```bash
>   sudo apt update && sudo apt install -y libfuse2
>   ```
> - **Ubuntu 24.04+ (AppArmor userns restrictions)**: Pass `--no-sandbox`:
>   ```bash
>   ./WebCam-*.AppImage --no-sandbox
>   ```

## Key Features

- 📦 **Native `.deb` Installer**: Standard Ubuntu package with automatic desktop launcher, menu integration, and system app search.
- 🔄 **Seamless Background Auto-Updates**: Powered by `electron-updater`, the app automatically checks GitHub Releases on launch and notifies/updates when a new release is published.
- 📷 **Instant Camera Preview**: Fast, low-latency live camera feed built on Electron and web APIs.
- 🔍 **Interactive Zoom Controls**: Mouse wheel scrolling for smooth 1x to 4x zoom adjustments, with single-click zoom reset.
- 🖼️ **Flexible Aspect Ratio Modes**: Seamlessly toggle between `contain` and `cover` object-fit views.
- 🔲 **Frameless Modern Interface**: Sleek dark UI with custom window controls (minimize, maximize, close).

## Commands

### Run the Application (Development)
To run the application in development mode:
```bash
npm install
npm start
```

### Build Production Packages (.deb & AppImage)
To compile lightweight production packages into `dist/`:
```bash
npm run build
```

### Run Unit Tests
To run unit tests and validation checks:
```bash
npm test
```

## 🚀 Automated Releases & CI/CD

Electron Webcam uses GitHub Actions to automatically compile production `.deb` installers and `.AppImage` packages and publish releases:
- **Automatic Releases on Push**: Every push to the `main` branch triggers `.github/workflows/build.yml`.
- **Timestamped Executables**: Compiles `dist/WebCam-<TIMESTAMP>.deb` and `dist/WebCam-<TIMESTAMP>.AppImage` binaries and attaches them directly to the GitHub Release.
- **Git Changelog**: Dynamically generates Markdown release notes listing recent commit messages and commit links.
- **Floating `latest` Tag**: Automatically updates the `latest` git tag pointer for effortless downloading.
