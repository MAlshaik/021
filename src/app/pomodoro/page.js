'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLockInTime, setIsLockInTime] = useState(true);
  const inputRef = useRef(null);
  const alarmRef = useRef(null);
  const router = useRouter();

  const LOCK_IN_TIME = 25 * 60;
  const PIZZA_TIME = 5 * 60;

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playAlarm();
      setTimeout(() => {
        if (alarmRef.current) {
          alarmRef.current.pause();
          alarmRef.current.currentTime = 0;
        }
        switchMode();
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    alarmRef.current = new Audio('/alarm.mp3');
  }, []);

  const switchMode = () => {
    setIsLockInTime(!isLockInTime);
    setTimeLeft(isLockInTime ? PIZZA_TIME : LOCK_IN_TIME);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setIsRunning(false);
  };

  const handleTimeChange = (e) => {
    if (e.key === 'Enter') {
      const [minutes, seconds] = e.target.value.split(':').map(Number);
      const newTimeLeft = minutes * 60 + seconds;
      setTimeLeft(newTimeLeft);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.play().catch(e => console.error("Error playing alarm:", e));
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          {isLockInTime ? "Let's lock in" : "Pizza break"}
        </h1>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            defaultValue={formatTime(timeLeft)}
            onKeyDown={handleTimeChange}
            className="text-6xl font-bold mb-6 bg-transparent text-white text-center outline-none"
          />
        ) : (
          <div 
            className="text-6xl font-bold mb-6 cursor-pointer" 
            onDoubleClick={handleDoubleClick}
          >
            {formatTime(timeLeft)}
          </div>
        )}
        <button
          className="text-white text-2xl mb-6"
          onClick={toggleTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
      <button
        className="mt-8 text-white text-lg"
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </div>
  );
}
