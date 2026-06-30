"use client";

import { motion } from "framer-motion";
import styles from "./SkillBar.module.css";

export default function SkillBar({ name, level }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.percentage} aria-hidden="true">
          {level}%
        </span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
