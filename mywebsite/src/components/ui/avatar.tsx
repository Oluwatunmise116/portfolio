import Image from "next/image";
import type { CSSProperties } from "react";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type AvatarProps = {
  /** Rendered pixel size of the circle — also used as the `sizes` hint. */
  size: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Small circular portrait (nav, contact accents).
 *
 * A 1:1 centre-crop of a full-body photo leaves the face only a few pixels
 * across, so this zooms to the face using `avatarFocus`/`avatarZoom` from
 * profile.ts. Both are data, not layout — swapping the photo means editing
 * those two values, not this component.
 *
 * Decorative by default: the portrait is always accompanied by the name or
 * a visible label, so `alt` is empty and the image is skipped by screen
 * readers rather than announced twice.
 */
export function Avatar({ size, className, style }: AvatarProps) {
  const { portrait } = profile;

  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full border border-border bg-surface-muted",
        className,
      )}
      style={{ width: size, height: size, ...style }}
    >
      <Image
        src={portrait.src}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover"
        style={{
          objectPosition: portrait.avatarFocus,
          scale: portrait.avatarZoom,
        }}
      />
    </span>
  );
}
