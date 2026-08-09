import { publicPath } from "@/shared/lib/publicPath";
import styles from "./TrainerCard.module.css";

interface TrainerCardProps {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export function TrainerCard({ name, role, bio, photo }: TrainerCardProps) {
  return (
    <article className={styles.row}>
      <div className={styles.photoBlock}>
        {photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={photo} alt={name} className={styles.image} />
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
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>
        {bio ? <p className={styles.bio}>{bio}</p> : null}
      </div>
    </article>
  );
}
