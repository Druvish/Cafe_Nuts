import { useState, useEffect } from 'react';

export default function Typewriter({
  words = ['perfect moments', 'crafted coffee', 'warm memories'],
  speed = 100,
  deleteSpeed = 50,
  delay = 2000
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting letter by letter
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, deleteSpeed);
    } else {
      // Typing letter by letter
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, speed);
    }

    // Handle full typed word delay
    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    }

    // Handle full deleted word transition to next
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delay]);

  return (
    <span className="relative inline-block text-cafe-terracotta border-r-2 border-cafe-terracotta pr-1 animate-pulse-cursor font-serif">
      {currentText}
      <style>{`
        @keyframes pulse-cursor {
          0%, 100% { border-color: transparent }
          50% { border-color: #D47A55 }
        }
        .animate-pulse-cursor {
          animation: pulse-cursor 0.8s infinite;
        }
      `}</style>
    </span>
  );
}
