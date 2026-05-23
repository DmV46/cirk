"use client";

import { useEffect, useRef, useState } from "react";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { teamIntroLines, teamMembers } from "../model/teamData";
import styles from "./TeamSection.module.css";

export function TeamSection() {
  const memberRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [visibleMembers, setVisibleMembers] = useState<boolean[]>(() =>
    teamMembers.map(() => false),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = memberRefs.current.findIndex((item) => item === entry.target);
          if (index === -1) {
            return;
          }

          const isVisibleNow = entry.isIntersecting && entry.intersectionRatio >= 0.2;
          setVisibleMembers((prev) => {
            if (prev[index] === isVisibleNow) {
              return prev;
            }
            const next = [...prev];
            next[index] = isVisibleNow;
            return next;
          });
        });
      },
      { threshold: [0, 0.2, 0.5] },
    );

    memberRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className={`page-section ${styles.section}`}>
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title">
            <CyberText text="НАША КОМАНДА" />
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.intro}>
            {teamIntroLines.map((line) => (
              <p key={line} className={styles.introLine}>
                {line}
              </p>
            ))}
          </div>

          <ul className={styles.list}>
            {teamMembers.map((member, index) => (
              <li
                key={member.id}
                ref={(node) => {
                  memberRefs.current[index] = node;
                }}
                className={`${styles.member} ${visibleMembers[index] ? styles.visible : ""}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span aria-hidden>⭐️ </span>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberDesc}> — {member.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
