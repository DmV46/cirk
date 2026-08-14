"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { publicPath } from "@/shared/lib/publicPath";
import {
  getDisplayedTeamMembers,
  getTeamCardBio,
  getTeamCardRole,
  teamIntroLines,
} from "../model/teamData";
import styles from "./TeamSection.module.css";

export function TeamSection() {
  const members = useMemo(() => getDisplayedTeamMembers(), []);
  const memberRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [visibleMembers, setVisibleMembers] = useState<boolean[]>(() =>
    members.map(() => false),
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
  }, [members]);

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
            {members.map((member, index) => {
              const photoSrc = member.photo ? publicPath(member.photo) : undefined;
              const photoOnRight = index % 2 === 1;

              return (
                <li
                  key={member.id}
                  ref={(node) => {
                    memberRefs.current[index] = node;
                  }}
                  className={`${styles.member} ${photoOnRight ? styles.photoRight : ""} ${visibleMembers[index] ? styles.visible : ""}`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className={styles.photoBlock}>
                    {photoSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={photoSrc} alt={member.name} className={styles.image} />
                    ) : (
                      <div className={styles.photoStub} aria-hidden>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={publicPath("/logo_200x200px.svg")}
                          alt=""
                          className={styles.photoStubLogo}
                        />
                        <span className={styles.photoStubLabel}>Фото</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{getTeamCardRole(member)}</p>
                    {getTeamCardBio(member) ? (
                      <p className={styles.memberBio}>{getTeamCardBio(member)}</p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
