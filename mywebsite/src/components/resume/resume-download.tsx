"use client";

import { FileDown, Printer } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

/**
 * Download + print actions.
 * TODO: the download points at public/resume/resume-placeholder.pdf —
 * replace that file (keeping the name), or change RESUME_PDF_PATH here.
 */
export const RESUME_PDF_PATH = "/resume/resume-placeholder.pdf";

export function ResumeDownload({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={RESUME_PDF_PATH}
        download
        className={buttonClasses(compact ? "secondary" : "primary")}
      >
        <FileDown aria-hidden="true" className="size-4" />
        Download PDF
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className={buttonClasses(compact ? "ghost" : "secondary")}
      >
        <Printer aria-hidden="true" className="size-4" />
        Print résumé
      </button>
    </div>
  );
}
