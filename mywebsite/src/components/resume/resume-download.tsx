"use client";

import { FileDown, Printer } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";
import { RESUME_PDF_PATH } from "@/lib/constants";

/**
 * Download and print actions for the résumé. The download button only
 * appears when a PDF is published (see RESUME_PDF_PATH in constants.ts).
 *
 * Printing works either way: the page has a print stylesheet and produces
 * a clean, navigation-free document from the live content.
 */
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
