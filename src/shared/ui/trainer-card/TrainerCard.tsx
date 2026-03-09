import Image from "next/image";
import styles from "./TrainerCard.module.css";

interface TrainerCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export function TrainerCard({ name, role, image, bio }: TrainerCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
        <p className={styles.bio}>{bio}</p>
      </div>
    </article>
  );
}
