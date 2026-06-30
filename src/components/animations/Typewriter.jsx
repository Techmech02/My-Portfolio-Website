"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import styles from "./Typewriter.module.css";

export default function Typewriter({
  words = ["systems.", "models.", "pipelines.", "automation.", "solutions."],
  typeSpeed = 110,
  deleteSpeed = 60,
  delayBetweenWords = 1800,
  delayAfterDelete = 400,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(words[0]);
      return;
    }

    let timer;
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // Pausing at full word
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Word cleared, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        timer = setTimeout(() => {}, delayAfterDelete);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words, prefersReducedMotion, typeSpeed, deleteSpeed, delayBetweenWords, delayAfterDelete]);

  return (
    <span className={styles.wrapper}>
      <span className={styles.text}>{displayText}</span>
      {!prefersReducedMotion && <span className={styles.cursor} aria-hidden="true" />}
    </span>
  );
}
