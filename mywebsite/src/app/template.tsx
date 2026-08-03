import type { ReactNode } from "react";

import { PageTransition } from "@/components/layout/page-transition";

/** Remounts on navigation so PageTransition replays its entrance. */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
