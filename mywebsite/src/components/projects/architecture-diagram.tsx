import type { ArchitectureDiagram as DiagramData } from "@/types/project";

/**
 * HTML/CSS block diagram, readable at every size, themable, and printable,
 * unlike an embedded raster of a schematic. Blocks flow vertically on
 * mobile and horizontally on wider screens with connector lines between.
 */
export function ArchitectureDiagram({ diagram }: { diagram: DiagramData }) {
  return (
    <figure className="min-w-0">
      <figcaption className="type-label mb-4 text-foreground-muted">
        {diagram.title}
      </figcaption>
      <ol className="flex list-none flex-col md:flex-row md:flex-wrap md:items-stretch">
        {diagram.blocks.map((block, i) => (
          <li
            key={block.label}
            className="flex flex-col md:flex-1 md:flex-row md:min-w-44"
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className="mx-6 h-5 w-px self-start bg-border-strong md:mx-0 md:my-0 md:h-auto md:w-4 md:self-center md:border-t md:border-border-strong md:bg-transparent"
              />
            )}
            <div className="flex-1 rounded-sm border border-border bg-surface p-4">
              <p className="text-sm font-medium">{block.label}</p>
              <p className="mt-1 text-xs text-foreground-muted">
                {block.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
