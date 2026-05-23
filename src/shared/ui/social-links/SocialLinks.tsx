import { SOCIAL_LINKS, type SocialLinkId } from "@/shared/lib/socialLinks";
import styles from "./SocialLinks.module.css";

type SocialLinksProps = {
  className?: string;
};

function SocialIcon({ id }: { id: SocialLinkId }) {
  switch (id) {
    case "vk":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.403c-.533 0-.694-.434-1.65-1.431-1.04-1.01-1.504-1.148-1.764-1.148-.361 0-.464.104-.464.604v1.317c0 .434-.139.694-1.277.694-1.881 0-3.973-1.138-5.445-3.256-2.225-3.05-2.83-5.35-2.83-5.82 0-.242.104-.464.604-.464h1.403c.45 0 .622.208.795.694.881 2.553 2.359 4.79 2.968 4.79.225 0 .325-.104.325-.674v-2.617c-.069-1.08-.622-1.173-.622-1.553 0-.208.173-.433.45-.433h2.204c.39 0 .533.208.533.664v3.54c0 .39.173.533.277.533.225 0 .415-.139.83-.553 1.277-1.433 2.191-3.64 2.191-3.64.121-.259.312-.464.761-.464h1.403c.553 0 .674.277.553.674-.225.9-2.386 4.21-2.386 4.21-.208.346-.277.485 0 .847.208.277.9.881 1.822 1.881 1.247 1.45 1.433 2.121 2.121 2.121h1.403c.553 0 .847-.277.64-.64-.208-.39-1.95-1.881-1.95-1.881z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"
          />
        </svg>
      );
    case "telegram":
      return (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
          />
        </svg>
      );
    case "max":
      return (
        <svg className={styles.iconMax} viewBox="0 0 24 24" aria-hidden>
          <rect width="24" height="24" rx="7" fill="currentColor" />
          <text
            x="12"
            y="15.5"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
            fill="#0b0f17"
          >
            MAX
          </text>
        </svg>
      );
    default:
      return null;
  }
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={`${styles.list} ${className ?? ""}`} aria-label="Социальные сети студии">
      {SOCIAL_LINKS.map((item) => (
        <li key={item.id}>
          <a
            className={styles.link}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
          >
            <SocialIcon id={item.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
