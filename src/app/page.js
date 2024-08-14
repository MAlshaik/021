'use client'
import styles from './page.module.scss'
import { useState, useEffect, useRef } from 'react';  
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';
import Image from 'next/image';
import { TwitterLogoIcon, DiscordLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [isLinkedInHovered, setIsLinkedInHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isPomodoroHovered, setIsPomodoroHovered] = useState(false);
  const [isLeaderboardHovered, setIsLeaderboardHovered] = useState(false);
  const { x, y } = useMousePosition();
  const [size, setSize] = useState(40);
  const socialIconsRef = useRef(null);
  const pomodoroRef = useRef(null);
  const leaderboardRef = useRef(null);
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
        window.open("https://twitter.com/your_twitter", '_blank', 'noopener,noreferrer');
        return;
      }
      if (isDiscordHovered) {
        window.open("https://discord.gg/udP6Yg8FTE", '_blank', 'noopener,noreferrer');
        return;
      }
      if (isLinkedInHovered) {
        window.open("https://www.linkedin.com/company/102021220/", '_blank', 'noopener,noreferrer');
        return;
      }
      if (isInstagramHovered) {
        window.open("https://www.instagram.com/021msu/", '_blank', 'noopener,noreferrer');
        return;
      }
      if (isPomodoroHovered) {
        router.push('/pomodoro');
        return;
      }
      if (isLeaderboardHovered) {
        router.push('/leaderboard');
        return;
      }
    }
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (socialIconsRef.current) {
        const discordRect = socialIconsRef.current.children[0].getBoundingClientRect();
        const twitterRect = socialIconsRef.current.children[1].getBoundingClientRect();
        const linkedInRect = socialIconsRef.current.children[2].getBoundingClientRect();
        const instagramRect = socialIconsRef.current.children[3].getBoundingClientRect();
        
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

        setIsLinkedInHovered(
          e.clientX >= linkedInRect.left &&
          e.clientX <= linkedInRect.right &&
          e.clientY >= linkedInRect.top &&
          e.clientY <= linkedInRect.bottom
        );

        setIsInstagramHovered(
          e.clientX >= instagramRect.left &&
          e.clientX <= instagramRect.right &&
          e.clientY >= instagramRect.top &&
          e.clientY <= instagramRect.bottom
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

      if (leaderboardRef.current) {
        const leaderboardRect = leaderboardRef.current.getBoundingClientRect();
        
        setIsLeaderboardHovered(
          e.clientX >= leaderboardRect.left &&
          e.clientX <= leaderboardRect.right &&
          e.clientY >= leaderboardRect.top &&
          e.clientY <= leaderboardRect.bottom
        );
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isTwitterHovered || isDiscordHovered || isLinkedInHovered || isInstagramHovered || isPomodoroHovered || isLeaderboardHovered) {
      setSize(20);
    } else if (isHovered) {
      setSize(400);
    } else {
      setSize(40);
    }
  }, [isTwitterHovered, isDiscordHovered, isLinkedInHovered, isInstagramHovered, isPomodoroHovered, isLeaderboardHovered, isHovered]);

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
              <div className="text-white hover:text-[#5865F2] transition-colors duration-300">
                <DiscordLogoIcon className="w-6 h-6" />
              </div>
              <div className="text-white hover:text-[#1DA1F2] transition-colors duration-300">
                <TwitterLogoIcon className="w-6 h-6" />
              </div>
              <div className="text-white hover:text-[#0077B5] transition-colors duration-300">
                <LinkedInLogoIcon className="w-6 h-6" />
              </div>
              <div className="text-white hover:text-[#E4405F] transition-colors duration-300">
                <InstagramLogoIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex gap-5">
              <div ref={pomodoroRef}>
                <div className="text-white hover:text-[#FF6347] transition-colors duration-300">
                  Pomodoro
                </div>
              </div>
              <div ref={leaderboardRef}>
                <div className="text-white hover:text-[#FFD700] transition-colors duration-300">
                  Leaderboard
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
