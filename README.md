# Vishal Veer — Lead Graphic Visualiser
## Premium Digital Resume & Interactive Visual Portfolio

A bespoke, responsive, editorial digital resume and interactive visual portfolio designed specifically for **Vishal Veer** (Lead Graphic Visualiser). Built with strict corporate restraint, refined typography, and an interactive Company → Client/Brand → Creative Work drill-down engine.

---

## Key Features

1. **Navigation Structure**:
   - Header navigation: `HOME` · `ABOUT` · `EXPERIENCE` · `EXPERTISE` · `CONTACT` (plus `QUICK VIEW` modal action).
   - Clean, balanced layout with smooth scroll navigation and active section indicators.
   - Clean removal of Philosophy and generic Design Disciplines categories.

2. **Dark & Light Mode System**:
   - Seamless, complete theme toggle affecting 100% of the interface (backgrounds, surfaces, borders, typography, modals, and lightboxes).
   - Minimal Sun / Moon icon button in the desktop sticky header and mobile navigation drawer.
   - Smooth 200–300ms transition between themes with centralized CSS custom properties.
   - Preserves state across reloads via `localStorage` (`vv_theme`) with automatic fallback to system OS `prefers-color-scheme`.
   - Zero Flash of Unstyled Content (FOUC) through an early `<head>` script.
   - **Dark Theme Palette**: Background `#0D0D0F`, Surface `#18181B`, Secondary `#232326`, Primary Text `#FFFFFF`, Secondary Text `#B8B8BE`, Accent Purple `#8B5CF6`, Blue `#4F46E5`, Digital Cyan `#00C4CC`, Optional Pink `#FF5C8A`.
   - **Light Theme Palette**: Background `#F7F7F8`, Surface `#FFFFFF`, Secondary `#F0F0F2`, Primary Text `#17171A`, Secondary Text `#64646B`, Accent Purple `#7C3AED`, Blue `#4F46E5`, Digital Cyan `#009FA8`.

3. **Typography System**:
   - **Poppins ONLY**: Exclusively Poppins across the entire site for headers, body, navigation, badges, and labels.
   - Strict hierarchy: ExtraBold (800) for Hero Name, Bold (700) for Section Titles, SemiBold (600) for Subheadings, Regular (400) for Body.
   - Fluid responsive scale using CSS `clamp()`.

4. **Statistics System**:
   - Strictly standardized metrics: **10+ Years Experience**, **75+ Clients Delivered**, **250+ Creative Projects**.
   - Zero references to "20+ years" or "two decades" anywhere in copy or metadata.

5. **Ultra-Compact Experience Timeline (`CREATIVE JOURNEY`)**:
   - Desktop card height ~110–140px, padding 24–28px, radius 14px.
   - Clean horizontal layout: sequence number on left (`01`–`06`), main information in center (Company, Role, Duration, Summary), vertically centered `VIEW WORK →` button on right.
   - Strictly NO logos, skill chips, or client-count badges inside timeline cards.
   - 6 Companies:
     - 01 EduRiser Learning Solutions Pvt. Ltd. (Lead Graphic Visualiser, Feb 2025 – Present)
     - 02 Karma Management Global Consulting Solutions Pvt. Ltd. (Graphic Designer, Jun 2022 – Jan 2024)
     - 03 DigiMarketerZ (Graphic Designer, Sep 2019 – May 2021)
     - 04 Veer Graphics (Graphic Designer / Self-employed, Nov 2016 – Aug 2019)
     - 05 SNP Softwares (Graphic Designer, May 2016 – Nov 2016)
     - 06 JKH Exports (Graphic Designer, 2015 – 2016)

6. **Dedicated Standalone Clients Showcase (`CLIENTS`)**:
   - Direct section showcasing enterprise accounts: **L&T**, **Manyavar / Vedant Fashion**, **Tata Steel**, **Brand 01**, **Brand 02**.
   - Interactive cards opening specific client deliverables and galleries directly into the drill-down modal.

7. **Technical & Creative Tools**:
   - Exact heading: **TECHNICAL & CREATIVE TOOLS** (strictly no percentage bars).
   - Strictly ordered 6-tier hierarchy:
     1. `01 ADOBE PHOTOSHOP` (Primary Visual Craft · Strongest Priority)
     2. `02 ADOBE ILLUSTRATOR` (Vector & Identity · Second Strongest Priority)
     3. `03 PREMIERE PRO` (Motion & Video)
     4. `04 CANVA` (Quick Production)
     5. `05 POWERPOINT` (Executive Presentations)
     6. `06 FIGMA` (Digital UI & Prototyping)

8. **Reusable Image Gallery & Full-Screen Lightbox**:
   - Aspect-ratio preserving grid layouts.
   - High-contrast editorial upload badges when no image file is provided.
   - Full-screen lightbox with Prev/Next buttons, image counter, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), and mobile touch swipe gestures.

9. **100% Zero-Dependency Web Architecture**:
   - Pure HTML5 + CSS3 + Modern Vanilla JavaScript.
   - Works immediately out-of-the-box by double-clicking `index.html` or deploying to any static host.

---

## Project Structure

```
portfolio/
├── index.html              # Semantic, accessible HTML5 single-page structure
├── css/
│   └── style.css           # Premium editorial styling, fluid typography, responsive layout
├── js/
│   ├── data.js             # Centralized portfolio & profile data model
│   └── app.js              # Interactive engine, drilldown modals, lightbox, swipe gestures
├── assets/
│   └── images/
│       ├── README.md       # Asset replacement guide
│       ├── profile/        # Personal photos (Hero, About, Process, Contact)
│       ├── companies/      # Employer logos (EduRiser, Karma Global, DigiMarketerZ, SNP, JKH Exports)
│       ├── clients/        # Client logos (L&T, Manyavar, Tata Steel, Karma Brands)
│       └── projects/       # Artwork by client and company
├── start-preview.ps1       # Lightweight PowerShell local server script (optional)
└── README.md               # Documentation
```

---

## How to Preview the Website

### Option 1: Double-Click (Direct Browser Open)
Simply double-click `index.html` in Windows Explorer. It will open directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Brave without needing any server.

### Option 2: PowerShell Local Server
Right-click `start-preview.ps1` and select **Run with PowerShell** (or run `.\start-preview.ps1` in your terminal). It will launch a local server at `http://localhost:8080/` and open your default browser automatically.

---

## How to Update Content and Upload Artwork

All content is managed centrally in **`js/data.js`**:

1. **Contact Information**:
   Update `PORTFOLIO_DATA.profile.contact` (email, phone, LinkedIn profile URL). All buttons (`EMAIL ME`, `CONNECT ON LINKEDIN`, `CALL ME`) update automatically.

2. **Personal Photos**:
   Place your photos in `assets/images/profile/` and update `PORTFOLIO_DATA.profile.photos`:
   ```javascript
   hero: {
     src: 'assets/images/profile/photo-01-hero.jpg',
     alt: 'Vishal Veer - Lead Graphic Visualiser'
   }
   ```

3. **Company & Client Logos**:
   Place logo files in `assets/images/companies/` or `assets/images/clients/` and set `logo: 'assets/images/companies/eduriser.svg'`.

4. **Portfolio Artwork Deliverables**:
   Place high-res image files in `assets/images/projects/` and add/update entries in the respective company or client `images` array:
   ```javascript
   images: [
     {
       id: "lt-01",
       title: "L&T Enterprise LMS Mailer",
       category: "LMS Mailer",
       src: "assets/images/projects/eduriser/l-and-t/mailer-01.jpg"
     }
   ]
   ```
   *Note: If `src` is set to `null`, the website automatically displays an elegant, high-contrast editorial placeholder badge.*

---

## Responsive Breakpoints Supported
- **Mobile**: 320px, 375px, 390px, 430px
- **Tablet**: 768px, 1024px
- **Desktop**: 1280px, 1440px, 1920px
