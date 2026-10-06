/**
 * VISHAL VEER — LEAD GRAPHIC VISUALISER
 * Centralized Portfolio & Resume Data Model
 * 
 * Instructions:
 * - Update any text, contact details, stats, or dates directly in this file.
 * - To link an actual image, set `image` or `logo` to the file path (e.g., 'assets/images/profile/hero.jpg').
 * - When `image` or `logo` is set to null, the system automatically renders an editorial placeholder badge.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Vishal Veer",
    title: "Lead Graphic Visualiser",
    experienceYears: "10+",
    tagline: "Creating purposeful visual experiences through graphic design, brand communication and digital storytelling.",
    shortBio: "With over 10+ years of experience in visual design, corporate communication, and digital experiences, I craft thoughtful, human-centered designs that drive real business clarity and engagement.",
    capabilities: [
      "Visual Design",
      "Digital Design",
      "LMS",
      "UI/UX",
      "Branding",
      "Corporate Communication"
    ],
    contact: {
      email: "vveer20@gmail.com",
      linkedin: "https://www.linkedin.com/in/vishal-veer-2211a5114",
      phone: "+91 9594391427",
      location: "India"
    },
    // Personal photography slots
    photos: {
      hero: {
        id: "hero-photo",
        src: "images/profile-main.png",
        placeholderLabel: "PROFILE MAIN",
        alt: "Vishal Veer - Lead Graphic Visualiser"
      },
      about: {
        id: "about-photo",
        src: "images/about-photo.jpg",
        placeholderLabel: "ABOUT PHOTO",
        alt: "Vishal Veer - Designing with Purpose"
      },
      process: {
        id: "process-photo",
        src: "images/profile-photo-01.jpg",
        placeholderLabel: "PROCESS PHOTO",
        alt: "Creative Visual Process and Thinking"
      },
      contact: {
        id: "contact-photo",
        src: "images/profile-photo-02.jpg",
        placeholderLabel: "CONTACT PHOTO",
        alt: "Vishal Veer - Let's Connect"
      }
    }
  },

  about: {
    headline: "DESIGNING WITH PURPOSE.",
    lead: "Visual design is not merely decoration—it is the strategic translation of complex ideas into clear, compelling, and memorable human experiences.",
    paragraphs: [
      "With 10+ years of experience, I create visual experiences that bring together creativity, clarity, and business purpose across enterprise learning, branding, marketing, and digital platforms.",
      "From a single visual to a complete design system, my focus is simple — make communication clearer, experiences stronger, and ideas more memorable."
    ],
    statistics: [
      {
        value: "10+",
        label: "YEARS EXPERIENCE",
        description: "Leading creative visual design and corporate communication"
      },
      {
        value: "75+",
        label: "CLIENTS DELIVERED",
        description: "Enterprises, brands, and collaborative partners"
      },
      {
        value: "250+",
        label: "CREATIVE PROJECTS",
        description: "LMS mailers, digital products, and brand collaterals"
      }
    ]
  },

  companies: [
    {
      id: "eduriser",
      number: "01",
      name: "EduRiser",
      fullName: "EduRiser Learning Solutions Pvt. Ltd.",
      shortName: "EduRiser",
      role: "Lead Graphic Visualiser",
      duration: "Dec 2023 – Present",
      location: "Mumbai, India",
      isCurrent: true,
      logo: "images/company-eduriser.jpg",
      logoPlaceholder: "EDURISER",
      summary: "Leading visual design, learning experience mailers, digital brand collateral, and web solutions for enterprise clients.",
      type: "with_clients", // Has dedicated client layer
      hasWork: true,
      buttonText: "VIEW WORK",
      clientsLabel: "SELECTED CLIENT WORK",
      clients: [
        {
          id: "eduriser-l-and-t",
          name: "L&T",
          fullName: "Larsen & Toubro",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-lnt.png",
          logoPlaceholder: "L&T",
          contribution: [
            "LMS Mailers",
            "Creative Design",
            "Web Design"
          ],
          description: "High-impact visual communication & web design collateral created for L&T.",
          images: [
            { id: "lt-01", title: "L&T Design 01", category: "LMS Mailer", src: "images/lnt-work-01.gif", placeholder: "L&T DESIGN 01" },
            { id: "lt-02", title: "L&T Design 02", category: "Creative Design", src: "images/lnt-work-02.jpg", placeholder: "L&T DESIGN 02" },
            { id: "lt-03", title: "L&T Design 03", category: "Web Design", src: "images/lnt-work-03.jpg", placeholder: "L&T DESIGN 03" }
          ]
        },
        {
          id: "eduriser-manyavar",
          name: "Vedant Fashions (Manyavar)",
          fullName: "Vedant Fashions (Manyavar)",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-manyavar.png",
          logoPlaceholder: "MANYAVAR",
          contribution: [
            "LMS Mailers",
            "Creative Design",
            "Web Design"
          ],
          description: "Visual design language, digital learning collateral, and mailers tailored for Manyavar / Vedant Fashion's internal and external branding.",
          images: [
            { id: "Vedant Fashions-01", title: "Manyavar Design 01", category: "LMS Mailer", src: "images/manyavar-work-01.jpg", placeholder: "MANYAVAR DESIGN 01" },
            { id: "Vedant Fashions-02", title: "Manyavar Design 02", category: "Brand Asset", src: "images/manyavar-work-02.jpg", placeholder: "MANYAVAR DESIGN 02" },
            { id: "Vedant Fashions-03", title: "Manyavar Design 03", category: "Creative Campaign", src: "images/manyavar-work-03.jpg", placeholder: "MANYAVAR DESIGN 03" }
          ]
        },
        {
          id: "eduriser-tata-steel",
          name: "Tata Steel",
          fullName: "Tata Steel Limited",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-tata-steel.svg",
          logoPlaceholder: "TATA STEEL",
          contribution: [
            "LMS Mailers",
            "Creative Design",
            "Corporate Communication"
          ],
          description: "Corporate visual assets, employee learning collateral, and creative mailers executed for Tata Steel.",
          images: [
            { id: "tata-01", title: "Tata Steel Design 01", category: "Creative Design", src: "images/tata-steel-work-01.gif", placeholder: "TATA STEEL DESIGN 01" },
            { id: "tata-02", title: "Tata Steel Design 02", category: "LMS Mailer", src: "images/tata-steel-work-02.jpg", placeholder: "TATA STEEL DESIGN 02" },
            { id: "tata-03", title: "Tata Steel Design 03", category: "Corporate Collateral", src: "images/tata-steel-work-03.jpg", placeholder: "TATA STEEL DESIGN 03" }
          ]
        },
        {
          id: "eduriser-tvs",
          name: "TVS",
          fullName: "TVS Motor Company / TVS Credit",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-tvs.svg",
          logoPlaceholder: "TVS",
          contribution: [
            "Visual Communication",
            "Leadership Series",
            "Campaign Mailers"
          ],
          description: "High-impact visual communication campaigns, leadership byte series, and digital engagement mailers created for TVS.",
          images: [
            { id: "tvs-01", title: "TVS Campaign Mailer", category: "Emailer Design", src: "images/tvs-work-01.jpg", placeholder: "TVS MAILER" },
            { id: "tvs-02", title: "TVS Digital Experience", category: "Video & Motion", src: "images/tvs-work-02.jpg", placeholder: "TVS EXPERIENCE" },
            { id: "tvs-03", title: "TVS Learning Journey", category: "Brand Asset", src: "images/tvs-work-03.jpg", placeholder: "TVS COLLATERAL" }
          ]
        },
        {
          id: "eduriser-taj",
          name: "Taj",
          fullName: "Taj Hotels (IHCL) / TajSATS",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-taj.png",
          logoPlaceholder: "TAJ",
          contribution: [
            "Brand Identity Collateral",
            "Digital UI Design",
            "Employee Learning"
          ],
          description: "Digital portal creative assets, brand excellence campaigns, and executive communication collaterals tailored for Taj Hotels & TajSATS.",
          images: [
            { id: "taj-01", title: "Taj Portal Experience", category: "Digital Interface", src: "images/taj-work-01.jpg", placeholder: "TAJ PORTAL" },
            { id: "taj-02", title: "Taj Brand Excellence Mailer", category: "Corporate Mailer", src: "images/taj-work-02.jpg", placeholder: "TAJ MAILER" },
            { id: "taj-03", title: "TajSATS Collateral Design", category: "Brand Asset", src: "images/taj-work-03.jpg", placeholder: "TAJSATS ASSET" }
          ]
        },
        {
          id: "eduriser-gulf-oil",
          name: "Gulf Oil",
          fullName: "Gulf Oil Lubricants India Ltd.",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-gulf-oil.svg",
          logoPlaceholder: "GULF OIL",
          contribution: [
            "Gamified Learning",
            "Portal Graphics",
            "Marketing Collateral"
          ],
          description: "Gamified learning graphics, sales race collateral, and branded portal assets developed for Gulf Oil.",
          images: [
            { id: "gulf-01", title: "Gulf Leading Business Asset", category: "Digital Collateral", src: "images/gulf-work-01.jpg", placeholder: "GULF DESIGN 01" },
            { id: "gulf-02", title: "Gulf Portal Path UI", category: "Portal Graphics", src: "images/gulf-work-02.jpg", placeholder: "GULF DESIGN 02" },
            { id: "gulf-03", title: "Gulf Learning Module Thumbnail", category: "Learning Asset", src: "images/gulf-work-03.jpg", placeholder: "GULF DESIGN 03" }
          ]
        },
        {
          id: "eduriser-bccl-times-group",
          name: "BCCL - Times Group",
          fullName: "Bennett, Coleman & Co. Ltd. (The Times Group)",
          clientBadge: "Client Project — EduRiser",
          relationshipNote: "Client account delivered during my tenure at EduRiser; not a direct employer.",
          logo: "images/client-times-group.png",
          logoClass: "logo-invert-dark",
          logoPlaceholder: "BCCL / TIMES GROUP",
          contribution: [
            "Microlearning Design",
            "Leadership Mailers",
            "Digital Collateral"
          ],
          description: "Microlearning mailers, leadership bucket campaigns, and digital learning portal collaterals created for The Times Group / BCCL.",
          images: [
            { id: "bccl-01", title: "BCCL Microlearning Campaign", category: "Campaign Mailer", src: "images/bccl-work-01.jpg", placeholder: "TIMES GROUP 01" },
            { id: "bccl-02", title: "BCCL Digital Learning Platform", category: "Learning Experience", src: "images/bccl-work-02.jpg", placeholder: "TIMES GROUP 02" },
            { id: "bccl-03", title: "BCCL Festival Creative Mailer", category: "Corporate Mailer", src: "images/bccl-work-03.jpg", placeholder: "TIMES GROUP 03" }
          ]
        }
      ]
    },

    {
      id: "karma-global",
      number: "02",
      name: "Karma Management Global Consulting Solutions Pvt. Ltd.",
      fullName: "Karma Management Global Consulting Solutions Pvt. Ltd.",
      shortName: "Karma Global",
      role: "Graphic Designer",
      duration: "Jun 2022 – Jan 2024",
      location: "Mumbai, India",
      isCurrent: false,
      logo: "images/company-karma-global.jpg",
      logoPlaceholder: "KARMA GLOBAL",
      summary: "Spearheaded brand creative collaterals, digital campaign assets, executive communication, and visual materials.",
      type: "direct_work",
      workLabel: "SELECTED CREATIVE WORK",
      hasWork: true,
      buttonText: "VIEW WORK",
      contribution: [
        "Brand Identity",
        "Campaign Visuals",
        "Corporate Collateral",
        "Executive Creative"
      ],
      images: [
        { id: "karma-01", title: "Karma Creative 01", category: "Campaign Visual", src: "images/karma-work-01.jpg", placeholder: "KARMA CREATIVE 01" },
        { id: "karma-02", title: "Karma Creative 02", category: "Visual Identity", src: "images/karma-work-02.jpg", placeholder: "KARMA CREATIVE 02" },
        { id: "karma-03", title: "Karma Creative 03", category: "Corporate Collateral", src: "images/karma-work-03.jpg", placeholder: "KARMA CREATIVE 03" },
        { id: "karma-04", title: "Karma Creative 04", category: "Digital Asset", src: "images/karma-work-04.jpg", placeholder: "KARMA CREATIVE 04" },
        { id: "karma-05", title: "Karma Creative 05", category: "Campaign Visual", src: "images/karma-work-05.jpg", placeholder: "KARMA CREATIVE 05" },
        { id: "karma-06", title: "Karma Creative 06", category: "Brand Asset", src: "images/karma-work-06.jpg", placeholder: "KARMA CREATIVE 06" },
        { id: "karma-07", title: "Karma Creative 07", category: "Marketing Collateral", src: "images/karma-work-07.jpg", placeholder: "KARMA CREATIVE 07" },
        { id: "karma-08", title: "Karma Creative 08", category: "Corporate Design", src: "images/karma-work-08.jpg", placeholder: "KARMA CREATIVE 08" },
        { id: "karma-09", title: "Karma Creative 09", category: "Social Creative", src: "images/karma-work-09.jpg", placeholder: "KARMA CREATIVE 09" },
        { id: "karma-10", title: "Karma Creative 10", category: "Event Graphics", src: "images/karma-work-10.jpg", placeholder: "KARMA CREATIVE 10" },
        { id: "karma-11", title: "Karma Creative 11", category: "Brand Communication", src: "images/karma-work-11.jpg", placeholder: "KARMA CREATIVE 11" },
        { id: "karma-12", title: "Karma Creative 12", category: "Executive Visual", src: "images/karma-work-12.jpg", placeholder: "KARMA CREATIVE 12" },
        { id: "karma-13", title: "Karma Creative 13", category: "Digital Marketing", src: "images/karma-work-13.jpg", placeholder: "KARMA CREATIVE 13" },
        { id: "karma-14", title: "Karma Creative 14", category: "Campaign Collateral", src: "images/karma-work-14.jpg", placeholder: "KARMA CREATIVE 14" }
      ]
    },

    {
      id: "digimarketerz",
      number: "03",
      name: "DigiMarketerZ",
      shortName: "DigiMarketerZ",
      role: "Graphic Designer",
      duration: "Sep 2019 – May 2021",
      location: "India",
      isCurrent: false,
      logo: "images/company-digimarketerz.jpg",
      logoPlaceholder: "DIGIMARKETERZ",
      summary: "Designed 360-degree digital advertising graphics, social media campaigns, brand collateral, and conversion-focused web banners.",
      type: "direct_work", // Directly presents creative works
      workLabel: "SELECTED CREATIVE WORK",
      hasWork: true,
      buttonText: "VIEW WORK",
      contribution: [
        "Digital Marketing Campaigns",
        "Social Media Creatives",
        "Web Banners & Ad Sets",
        "Brand Collateral"
      ],
      images: [
        { id: "dm-01", title: "DigiMarketerZ Design 01", category: "Digital Campaign", src: "images/digimarketerz-work-01.gif", placeholder: "DIGIMARKETERZ DESIGN 01" },
        { id: "dm-02", title: "DigiMarketerZ Design 02", category: "Social Creative", src: "images/digimarketerz-work-02.jpg", placeholder: "DIGIMARKETERZ DESIGN 02" },
        { id: "dm-03", title: "DigiMarketerZ Design 03", category: "Web Banner", src: "images/digimarketerz-work-03.jpg", placeholder: "DIGIMARKETERZ DESIGN 03" },
        { id: "dm-04", title: "DigiMarketerZ Design 04", category: "Brand Collateral", src: "images/digimarketerz-work-04.jpg", placeholder: "DIGIMARKETERZ DESIGN 04" }
      ]
    },

    {
      id: "veer-graphics",
      number: "04",
      name: "Veer Graphics",
      shortName: "Veer Graphics",
      role: "Graphic Designer / Self-employed",
      duration: "Nov 2016 – Aug 2019",
      location: "India",
      isCurrent: false,
      logo: "images/company-veer-graphics.jpg",
      logoPlaceholder: "VEER GRAPHICS",
      summary: "Independent design practice providing complete identity creation, corporate brochures, print production oversight, and bespoke digital collaterals.",
      type: "direct_work",
      workLabel: "SELECTED CREATIVE WORK",
      hasWork: true,
      buttonText: "VIEW WORK",
      contribution: [
        "Brand Identity Systems",
        "Print Production Design",
        "Corporate Brochures",
        "Visual Consultation"
      ],
      images: [
        { id: "vg-01", title: "Veer Graphics Design 01", category: "Brand Identity", src: "images/veer-graphics-work-01.jpg", placeholder: "VEER GRAPHICS DESIGN 01" },
        { id: "vg-02", title: "Veer Graphics Design 02", category: "Corporate Brochure", src: "images/veer-graphics-work-02.jpg", placeholder: "VEER GRAPHICS DESIGN 02" },
        { id: "vg-03", title: "Veer Graphics Design 03", category: "Print Production", src: "images/veer-graphics-work-03.jpg", placeholder: "VEER GRAPHICS DESIGN 03" }
      ]
    },

    {
      id: "snp-softwares",
      number: "05",
      name: "SNP Softwares",
      shortName: "SNP Softwares",
      role: "Graphic Designer",
      duration: "May 2016 – Nov 2016",
      location: "India",
      isCurrent: false,
      logo: "images/company-snp-softwares.jpg",
      logoPlaceholder: "SNP SOFTWARES",
      summary: "Created software UI graphics, application icons, marketing banners, and technical product presentation decks.",
      type: "direct_work",
      workLabel: "SELECTED CREATIVE WORK",
      hasWork: false,
      buttonText: null,
      contribution: [
        "Software UI Graphics",
        "Product Presentations",
        "Marketing Assets"
      ],
      images: []
    },

    {
      id: "jkh-exports",
      number: "06",
      name: "JKH Exports",
      shortName: "JKH Exports",
      role: "Graphic Designer",
      duration: "2015 – 2016", // Editable duration
      location: "India",
      isCurrent: false,
      logo: "images/company-jkh-exports.jpg",
      logoPlaceholder: "JKH EXPORTS",
      summary: "Designed export packaging graphics, catalog layouts, promotional collateral, and international trade materials.",
      type: "direct_work",
      workLabel: "SELECTED CREATIVE WORK",
      hasWork: false,
      buttonText: null,
      contribution: [
        "Packaging Design",
        "Product Catalogues",
        "Trade Collateral"
      ],
      images: []
    }
  ],

  featuredClients: [
    {
      id: "eduriser-l-and-t",
      companyId: "eduriser",
      name: "L&T",
      fullName: "Larsen & Toubro",
      category: "Enterprise Learning & Web",
      logo: "images/client-lnt.jpg",
      logoPlaceholder: "L&T",
      deliverables: "LMS Mailers · Creative Design · Web Design"
    },
    {
      id: "eduriser-manyavar",
      companyId: "eduriser",
      name: "Manyavar / Vedant Fashion",
      fullName: "Manyavar — Vedant Fashions Limited",
      category: "Digital Learning & Branding",
      logo: "images/client-manyavar.jpg",
      logoPlaceholder: "MANYAVAR",
      deliverables: "LMS Mailers · Creative Design · Web Design"
    },
    {
      id: "eduriser-tata-steel",
      companyId: "eduriser",
      name: "Tata Steel",
      fullName: "Tata Steel Limited",
      category: "Corporate Learning & Communication",
      logo: "images/client-tata-steel.jpg",
      logoPlaceholder: "TATA STEEL",
      deliverables: "LMS Mailers · Creative Design · Corporate Communication"
    }
  ],

  tools: [
    {
      id: "photoshop",
      name: "Adobe Photoshop",
      icon: "images/Adobe Photoshop.svg",
      percentage: 95,
      disciplines: "Visual Design · Image Editing · Creative Production"
    },
    {
      id: "illustrator",
      name: "Adobe Illustrator",
      icon: "images/Adobe Illustrator.svg",
      percentage: 90,
      disciplines: "Vector Design · Branding · Visual Communication"
    },
    {
      id: "canva",
      name: "Canva",
      icon: "images/canva.svg",
      percentage: 100,
      disciplines: "Digital Content · Quick Creative Production"
    },
    {
      id: "premiere",
      name: "Premiere Pro",
      icon: "images/Premiere Pro.svg",
      percentage: 75,
      disciplines: "Video Editing · Motion Content"
    },
    {
      id: "powerpoint",
      name: "PowerPoint",
      icon: "images/powerpoint.svg",
      percentage: 100,
      disciplines: "Presentation Design · Visual Storytelling"
    },
    {
      id: "figma",
      name: "Figma",
      icon: "images/Figma.svg",
      percentage: 60,
      disciplines: "UI Design · Digital Experiences · Prototyping"
    }
  ]
};
