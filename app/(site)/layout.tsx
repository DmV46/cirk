import { NeonFlowBackground } from "@/shared/ui/neon-flow/NeonFlowBackground";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NeonFlowBackground />
      {children}
    </>
  );
}
