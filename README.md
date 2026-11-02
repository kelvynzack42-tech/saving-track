# SaveTrack Mobile (Installable PWA)

This is the mobile-friendly SaveTrack version for Android phones and iPhone. It reuses the savings tracker interface and adds an installable app shell, offline caching, mobile safe-area handling, and browser notification support where available.

## Important: publishing is required for installation
A PWA must be served over **HTTPS** (or localhost for testing). Do not open `index.html` directly from a phone's Files app; installability and offline features may not work.

## Fast test on your computer
1. Install Node.js if needed.
2. Open a terminal in this folder.
3. Run `npx serve .` (first run may download the tiny server package).
4. Open the local address shown by the command on your computer to test the page. For phone testing, publish the folder to an HTTPS host or use a secure local testing setup.

## Publish for your phone
Upload the contents of this folder to a static HTTPS host such as GitHub Pages or Netlify. Keep `index.html`, `manifest.webmanifest`, `service-worker.js`, and the `icons` folder together at the same site path.

## Install on Android
1. Open the published HTTPS site in Chrome.
2. Use the browser menu and choose **Install app** or **Add to Home screen**.
3. Open SaveTrack from the new home-screen icon.

## Install on iPhone
1. Open the published HTTPS site in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**, then tap **Add**.
4. Open SaveTrack from the home screen.

## Data and security
- Data stays in the browser storage on that phone. It does **not** automatically sync with the Windows app or another phone.
- This PWA does not provide server-side account sync or end-to-end encrypted cloud backup.
- Browser storage is not encrypted by this app. The optional PIN is a convenience lock, not strong encryption.
- Export JSON backups regularly via Settings → Backup and data. JSON exports are not encrypted; store them securely.
- Offline page loading is cached after the first successful online load. Browser/OS storage cleanup may remove cached files or app data.
- Reminder checks run while SaveTrack is open. Browser notifications require permission and support varies by browser/OS. They are not guaranteed to run on a schedule when the app is fully closed, especially on iPhone. This project does not include a push-notification server.
- SaveTrack does not connect to banks or move money.

## Files
- `index.html` — application
- `manifest.webmanifest` — install metadata
- `service-worker.js` — offline app-shell cache and notification click handling
- `icons/` — app icons
