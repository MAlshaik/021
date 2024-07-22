# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

# postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# package.json

```json
{
  "name": "cursor-hover-mask",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-icons": "^1.3.0",
    "eslint": "8.45.0",
    "eslint-config-next": "13.4.12",
    "framer-motion": "^10.14.0",
    "next": "^14.2.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "sass": "^1.64.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6"
  }
}

```

# next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

```

# jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

# README.md

```md
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .eslintrc.json

```json
{
  "extends": "next/core-web-vitals"
}

```

# public/vercel.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/mask.svg

This is a file of the type: SVG Image

# public/hatch.jpeg

This is a binary file of the type: Image

# src/app/page.module.scss

```scss
.main {
  height: 100vh;
  cursor: pointer;

  .mask, .body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #DDD;
    font-size: 64px;
    line-height: 66px;
    
    h1 {
      margin: 0;
      padding: 40px;
      text-align: center;
    }
  }

  .mask {
    mask-image: url('../../public/mask.svg');
    mask-repeat: no-repeat;
    mask-size: 40px;
    background: #fff;
    position: absolute;
    color: black;
  }

  .imageContainer {
    margin-top: 20px;
  }

  .socialIcons {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    a {
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .socialIcons {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: white;
      transition: color 0.3s ease;

      svg {
        width: 100%;
        height: 100%;
      }

      &.twitterIcon:hover {
        color: #1DA1F2; // Twitter blue
      }

      &.discordIcon:hover {
        color: #5865F2; // Discord purple
      }
    }
  }
}

```

# src/app/page.js

```js
'use client'
import styles from './page.module.scss'
import { useState, useEffect } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';
import Image from 'next/image';
import { TwitterLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';


export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  const pages = [
    {
      body: "021@msu",
      mask: "we build cool sh*t",
      image: null
    },
    {
      body: "Every Sunday @ the hatch",
      mask: "Build alongside like minded students",
      image: "/hatch.jpeg" 
    },
    {
      body: "See you there",
      mask: "p.s we got pizza :)",
      image: null
    }
  ];

  const handleClick = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  useEffect(() => {
    document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <main className="h-screen cursor-pointer" onClick={handleClick}>
      <motion.div 
        className="absolute w-full h-full flex flex-col items-center justify-center text-black bg-white"
        style={{
          maskImage: 'url("/mask.svg")',
          maskRepeat: 'no-repeat',
          maskSize: '40px',
        }}
        animate={{
          WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <h1 
          className="text-6xl leading-tight p-10 text-center"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          {pages[currentPage].mask}
        </h1>
      </motion.div>

      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl leading-tight p-10 text-center">{pages[currentPage].body}</h1>
        {pages[currentPage].image && (
          <div className="mt-5 rounded-sm">
            <Image src={pages[currentPage].image} alt="Hatch image" width={500} height={300} />
          </div>
        )}
        {currentPage === 0 && (
          <div className="flex gap-5 mt-5">
            <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer" 
               className="text-white hover:text-[#1DA1F2] transition-colors duration-300">
              <TwitterLogoIcon className="w-6 h-6" />
            </a>
            <a href="https://discord.gg/your_discord" target="_blank" rel="noopener noreferrer"
               className="text-white hover:text-[#5865F2] transition-colors duration-300">
              <DiscordLogoIcon className="w-6 h-6" />
            </a>
          </div>
        )}
      </div>
    </main>
  )
}

```

# src/app/layout.js

```js
import './globals.css'
import { Kalam } from "next/font/google";

export const metadata = {
  title: '021',
  description: 'A community of builders at Michigan State University',
}

const kalam = Kalam({
    weight: "300",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kalam.className}>{children}</body>
    </html>
  )
}

```

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles go here */
* {
 cursor: none !important;
}
@font-face {
    font-family: 'Avant Garde Book BT';
    font-style: normal;
    font-weight: normal;
    src: url('../../public/fonts/AVGARDD_2.woff') format('woff');
}

body{
    margin: 0px;
    background-color: #0f0f0f;
    font-family: 'Avant Garde Book BT';
}




```

# src/app/favicon.ico

This is a binary file of the type: Binary

# public/fonts/AVGARDN_2.woff

This is a binary file of the type: Binary

# public/fonts/AVGARDD_2.woff

This is a binary file of the type: Binary

# src/app/utils/useMousePosition.js

```js
import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = e => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default useMousePosition;
```

