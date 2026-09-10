import { ReactNode } from "react";
export function ProfileSection({ label, children }: { label: string; children: ReactNode }) { return <section className="mt-5"><p className="mb-2 text-[12px] font-medium tracking-[0.12em] text-muted-foreground">{label}</p>{children}</section>; }
