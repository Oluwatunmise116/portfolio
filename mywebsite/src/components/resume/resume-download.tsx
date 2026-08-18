"use client";

import { FileDown, Printer } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

/**
 * Path to the résumé PDF.
 *
 * Deliberately null: no real résumé PDF has been supplied, and offering a
 * "Download PDF" button that hands a visitor a placeholder file is worse
 * than not offering one. Drop the real file into public/resume/ and set
 * this to its path (e.g. "/resume/oluwatunmise-olabanji-resume.pdf") — the
 * download button then appears automatically.
 *
 * Printing still works either way: the page has a print stylesheet and
 * produces a clean, navigation-free document from the live content.
 */
export const RESUME_PDF_PATH: string | null = null;

export function ResumeDownload({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {RESUME_PDF_PATH && (
        <a
          href={RESUME_PDF_PATH}
          download
          className={buttonClasses(compact ? "secondary" : "primary")}
        >
          <FileDown aria-hidden="true" className="size-4" />
          Download PDF
        </a>
      )}
      <button
        type="button"
        onClick={() => window.print()}
        className={buttonClasses(
          RESUME_PDF_PATH ? (compact ? "ghost" : "secondary") : "primary",
        )}
      >
        <Printer aria-hidden="true" className="size-4" />
        Print / save as PDF
      </button>
    </div>
  );
}
