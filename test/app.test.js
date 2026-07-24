const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const BASE_DIR = path.resolve(__dirname, '..');

test('package.json configuration and assets', (t) => {
  const pkgPath = path.join(BASE_DIR, 'package.json');
  assert.ok(fs.existsSync(pkgPath), 'package.json must exist');

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  assert.equal(pkg.name, 'electron_webcam');
  assert.equal(pkg.main, 'src/index.js');
  assert.ok(pkg.build, 'build section must be defined');
  assert.equal(pkg.build.linux.executableName, 'WebCam');
  assert.deepEqual(pkg.build.linux.target, ['deb', 'AppImage']);

  const mainFile = path.join(BASE_DIR, pkg.main);
  assert.ok(fs.existsSync(mainFile), 'Main entry point src/index.js must exist');

  const iconPath = path.join(BASE_DIR, pkg.build.linux.icon);
  assert.ok(fs.existsSync(iconPath), 'App icon asset must exist at ' + pkg.build.linux.icon);
});

test('source code syntax validation', (t) => {
  const sourceFiles = ['src/index.js', 'src/main.js', 'src/preload.js'];

  for (const file of sourceFiles) {
    const filePath = path.join(BASE_DIR, file);
    assert.ok(fs.existsSync(filePath), `${file} must exist`);
    assert.doesNotThrow(() => {
      execSync(`node -c "${filePath}"`, { stdio: 'pipe' });
    }, `${file} should pass syntax validation`);
  }
});

test('IPC contract consistency between index.js and preload.js', (t) => {
  const indexContent = fs.readFileSync(path.join(BASE_DIR, 'src/index.js'), 'utf-8');
  const preloadContent = fs.readFileSync(path.join(BASE_DIR, 'src/preload.js'), 'utf-8');

  const expectedChannels = [
    'window:minimize',
    'window:close',
    'window:toggleMaximize',
    'window:isMaximized',
  ];

  for (const channel of expectedChannels) {
    assert.ok(indexContent.includes(channel), `index.js must handle IPC channel: ${channel}`);
    assert.ok(preloadContent.includes(channel), `preload.js must invoke IPC channel: ${channel}`);
  }
});

test('main.html structure and required DOM elements', (t) => {
  const htmlPath = path.join(BASE_DIR, 'src/main.html');
  assert.ok(fs.existsSync(htmlPath), 'src/main.html must exist');

  const html = fs.readFileSync(htmlPath, 'utf-8');

  const requiredIds = [
    'video',
    'fitToggle',
    'zoomButton',
    'zoomLabel',
    'winMinimize',
    'winMaximize',
    'winClose',
  ];

  for (const id of requiredIds) {
    assert.ok(
      html.includes(`id="${id}"`),
      `main.html must contain DOM element with id="${id}"`
    );
  }

  assert.ok(html.includes('href="main.css"'), 'main.html must link main.css');
  assert.ok(html.includes('src="main.js"'), 'main.html must include main.js');
  assert.ok(html.includes('lucide'), 'main.html must include Lucide icons library');
});

test('zoom logic calculation and formatting', (t) => {
  function clampZoom(z) {
    z = Math.min(Math.max(z, 1), 4);
    return Math.round(z * 10) / 10;
  }

  function formatZoom(z) {
    if (Number.isInteger(z)) {
      return `${z}x`;
    }
    return `${z.toFixed(1)}x`;
  }

  // Zoom bounds tests
  assert.equal(clampZoom(0.5), 1.0, 'Zoom below 1 should clamp to 1');
  assert.equal(clampZoom(5.0), 4.0, 'Zoom above 4 should clamp to 4');
  assert.equal(clampZoom(2.34), 2.3, 'Zoom rounding should round to 1 decimal place');

  // Zoom formatting tests
  assert.equal(formatZoom(1), '1x');
  assert.equal(formatZoom(2), '2x');
  assert.equal(formatZoom(1.5), '1.5x');
  assert.equal(formatZoom(3.8), '3.8x');
});

test('maximize icon state logic', (t) => {
  function getMaximizeIcon(isMaximized) {
    return isMaximized ? '<i data-lucide="copy"></i>' : '<i data-lucide="square"></i>';
  }

  assert.equal(getMaximizeIcon(true), '<i data-lucide="copy"></i>');
  assert.equal(getMaximizeIcon(false), '<i data-lucide="square"></i>');
});
