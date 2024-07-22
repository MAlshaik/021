'use client'
import styles from './page.module.scss'
import { useState, useEffect, useRef } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';
import Image from 'next/image';
import { TwitterLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [isPomodoroHovered, setIsPomodoroHovered] = useState(false);
  const { x, y } = useMousePosition();
  const [size, setSize] = useState(40);
  const socialIconsRef = useRef(null);
  const pomodoroRef = useRef(null);
  const mainRef = useRef(null);
  const router = useRouter();

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

  const handleMainClick = (e) => {
    e.preventDefault();
    if (currentPage === 0) {
      if (isTwitterHovered) {
        console.log('Twitter icon clicked, opening Twitter');
        window.open("https://twitter.com/your_twitter", '_blank', 'noopener,noreferrer');
        return;
      }
      if (isDiscordHovered) {
        console.log('Discord icon clicked, opening Discord');
        window.open("https://discord.gg/your_discord", '_blank', 'noopener,noreferrer');
        return;
      }
      if (isPomodoroHovered) {
        console.log('Pomodoro clicked, navigating to /pomodoro');
        router.push('/pomodoro');
        return;
      }
    }
    console.log('Changing page');
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (socialIconsRef.current) {
        const twitterRect = socialIconsRef.current.children[0].getBoundingClientRect();
        const discordRect = socialIconsRef.current.children[1].getBoundingClientRect();
        
        setIsTwitterHovered(
          e.clientX >= twitterRect.left &&
          e.clientX <= twitterRect.right &&
          e.clientY >= twitterRect.top &&
          e.clientY <= twitterRect.bottom
        );
        
        setIsDiscordHovered(
          e.clientX >= discordRect.left &&
          e.clientX <= discordRect.right &&
          e.clientY >= discordRect.top &&
          e.clientY <= discordRect.bottom
        );
      }
      
      if (pomodoroRef.current) {
        const pomodoroRect = pomodoroRef.current.getBoundingClientRect();
        
        setIsPomodoroHovered(
          e.clientX >= pomodoroRect.left &&
          e.clientX <= pomodoroRect.right &&
          e.clientY >= pomodoroRect.top &&
          e.clientY <= pomodoroRect.bottom
        );
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isTwitterHovered || isDiscordHovered || isPomodoroHovered) {
      setSize(20);
    } else if (isHovered) {
      setSize(400);
    } else {
      setSize(40);
    }
    console.log('Size updated:', size);
  }, [isTwitterHovered, isDiscordHovered, isPomodoroHovered, isHovered]);

  return (
    <main className="home h-screen cursor-pointer" ref={mainRef} onClick={handleMainClick}>
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
            <Image src={pages[currentPage].image} alt="Hatch image" width={500} height={300} style={{ width: 'auto', height: 'auto' }} />
          </div>
        )}
        {currentPage === 0 && (
          <div className="max-w-lg w-full flex justify-between px-10 mt-5">
            <div className="flex gap-5" ref={socialIconsRef}>
              <div className="text-white hover:text-[#1DA1F2] transition-colors duration-300">
                <TwitterLogoIcon className="w-6 h-6" />
              </div>
              <div className="text-white hover:text-[#5865F2] transition-colors duration-300">
                <DiscordLogoIcon className="w-6 h-6" />
              </div>
            </div>
            <div ref={pomodoroRef}>
              <div className="text-white hover:text-[#FF6347] transition-colors duration-300">
                Pomodoro
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
