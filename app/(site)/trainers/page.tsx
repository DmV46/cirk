import type { Metadata } from "next";
import { CyberText } from "@/shared/ui/cyber-text/CyberText";
import { TrainerCard } from "@/shared/ui/trainer-card/TrainerCard";
import {
  getTeamCardBio,
  getTeamCardRole,
  getTrainerPlaceholderImage,
  teamIntroLines,
  teamMembers,
} from "@/widgets/team/model/teamData";

export const metadata: Metadata = {
  title: "Наша команда — Цирковая студия",
  description: `${teamIntroLines.join(" ")} Знакомьтесь с командой Объединённой цирковой студии.`,
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

          <div
            style={{
              display: "grid",
              marginTop: "4rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {teamMembers.map((member, index) => (
              <TrainerCard
                key={member.id}
                name={member.name}
                role={getTeamCardRole(member)}
                image={getTrainerPlaceholderImage(member.name, index)}
                bio={getTeamCardBio(member)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
