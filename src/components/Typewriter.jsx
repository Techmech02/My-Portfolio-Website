import { useEffect, useState } from "react";
import { typewriterWords } from "../data/modalData";

export default function Typewriter() {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typewriterWords[wordIdx];
    let delay = deleting ? 60 : 110;

    const timer = setTimeout(() => {
      if (deleting) {
        const next = charIdx - 1;
        setCharIdx(next);
        setText(word.slice(0, next));
        if (next === 0) {
          setDeleting(false);
          setWordIdx((wordIdx + 1) % typewriterWords.length);
          delay = 400;
        }
      } else {
        const next = charIdx + 1;
        setCharIdx(next);
        setText(word.slice(0, next));
        if (next === word.length) {
          setDeleting(true);
          delay = 1800;
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [wordIdx, charIdx, deleting]);

  return <span className="accent typewriter">{text}</span>;
}
