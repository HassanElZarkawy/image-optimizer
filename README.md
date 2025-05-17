resizer/
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── postcss.config.js         # PostCSS configuration for Tailwind
├── tailwind.config.js        # Tailwind CSS configuration
├── public/                   # Static files
├── src/
│   ├── app/
│   │   ├── favicon.ico       # App favicon
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout component
│   │   ├── page.tsx          # Home page component
│   │   └── api/
│   │       └── process-image/
│   │           └── route.ts  # API route handler for image processing
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx    # Reusable button component
│   │   │   ├── dropdown.tsx  # Dropdown component for options
│   │   │   └── spinner.tsx   # Loading spinner component
│   │   ├── image-processor/
│   │   │   ├── dropzone.tsx  # Image dropzone component
│   │   │   ├── image-preview.tsx # Image preview component
│   │   │   ├── resize-controls.tsx # Image resize controls
│   │   │   └── processor.tsx # Main image processor component
│   │   └── layout/
│   │       └── header.tsx    # Application header
│   ├── lib/
│   │   ├── image-utils.ts    # Image processing utilities
│   │   └── types.ts          # TypeScript types
│   └── hooks/
│       ├── use-image-processor.ts # Custom hook for image processing
│       └── use-resize.ts     # Custom hook for handling image resizing
└── README.md                 # Project documentation