# Portfolio Image Asset Directory Guide

This directory is organized to make adding or replacing your portfolio images easy, intuitive, and clean.

## Folder Organization

```
assets/images/
├── profile/        # Personal photography
│   ├── photo-01-hero.jpg           # [UPLOAD HERO PHOTO]
│   ├── photo-02-about.jpg          # [UPLOAD ABOUT PHOTO]
│   ├── photo-03-process.jpg        # [UPLOAD CREATIVE PROCESS PHOTO]
│   └── photo-04-contact.jpg        # [UPLOAD CONTACT / OPTIONAL PHOTO]
│
├── companies/      # Company employer logos
│   ├── eduriser.svg / .png         # [UPLOAD EDURISER LOGO]
│   ├── karma-global.svg / .png     # [UPLOAD KARMA GLOBAL LOGO]
│   ├── digimarketerz.svg / .png    # [UPLOAD DIGIMARKETERZ LOGO]
│   ├── snp-softwares.svg / .png    # [UPLOAD SNP SOFTWARES LOGO]
│   └── jkh-exports.svg / .png      # [UPLOAD JKH EXPORTS LOGO]
│
├── clients/        # Client & brand logos
│   ├── l-and-t.svg / .png          # [UPLOAD L&T LOGO]
│   ├── manyavar.svg / .png         # [UPLOAD MANYAVAR LOGO]
│   ├── tata-steel.svg / .png       # [UPLOAD TATA STEEL LOGO]
│   ├── brand-01.svg / .png         # [UPLOAD BRAND 01 LOGO]
│   └── brand-02.svg / .png         # [UPLOAD BRAND 02 LOGO]
│
└── projects/       # Creative work artwork
    ├── eduriser/
    │   ├── l-and-t/                # L&T designs (01 to 06+)
    │   ├── manyavar/               # Manyavar designs (01 to 04+)
    │   └── tata-steel/             # Tata Steel designs (01 to 04+)
    ├── karma-global/
    │   ├── brand-01/               # Brand 01 designs (01 to 04+)
    │   └── brand-02/               # Brand 02 designs (01 to 04+)
    ├── digimarketerz/              # DigiMarketerZ designs (01 to 06+)
    ├── snp-softwares/              # SNP Softwares designs (01 to 04+)
    └── jkh-exports/                # JKH Exports designs (01 to 03+)
```

## How to Update Images

1. Place your image files in the corresponding folders above.
2. Open `js/data.js` and set the `image` or `logo` property to point to your new file (e.g. `assets/images/profile/photo-01-hero.jpg`).
3. If an image path is left empty or set to `null`, the website automatically displays an elegant, high-contrast editorial placeholder badge indicating what image belongs there!
