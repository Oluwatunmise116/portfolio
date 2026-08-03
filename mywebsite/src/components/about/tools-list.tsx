import { toolsList } from "@/data/skills";

export function ToolsList() {
  return (
    <ul className="grid list-none gap-x-10 gap-y-3 sm:grid-cols-2">
      {toolsList.map((tool) => (
        <li
          key={tool.name}
          className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
        >
          <span className="text-sm font-medium">{tool.name}</span>
          <span className="type-meta text-right text-foreground-muted">
            {tool.use}
          </span>
        </li>
      ))}
    </ul>
  );
}
