import type { Metadata } from "next";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { TrainerCard } from "@/shared/ui/trainer-card/TrainerCard";
import {
  getTeamCardBio,
  getTeamCardRole,
  teamIntroLines,
  teamMembers,
} from "@/widgets/team/model/teamData";
import { publicPath } from "@/shared/lib/publicPath";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Наша команда",
  description: `${teamIntroLines.join(" ")} Тренеры объединённой цирковой студии в г. Московский — профессиональные артисты цирка.`,
  alternates: {
    canonical: "/trainers",
  },
};

export default function TrainersPage() {
  return (
    <div>
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">
              <CyberText text="НАША КОМАНДА" />
            </h1>
            <p className="section-subtitle">{teamIntroLines.join(" ")}</p>
          </div>

          <div className={styles.list}>
            {[...teamMembers].reverse().map((member) => (
              <TrainerCard
                key={member.id}
                name={member.name}
                role={getTeamCardRole(member)}
                photo={member.photo ? publicPath(member.photo) : undefined}
                bio={getTeamCardBio(member)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
