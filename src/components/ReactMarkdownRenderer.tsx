interface Props {
  content: string;
}

const ReactMarkdownRenderer = ({ content }: Props) => {
  // Simple markdown-like rendering without external dependency
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    let tableRows: string[][] = [];
    let inTable = false;

    const processInline = (line: string): (string | JSX.Element)[] => {
      const parts: (string | JSX.Element)[] = [];
      const regex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;
      let key = 0;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        parts.push(
          <strong key={key++} className="font-semibold text-foreground">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }
      return parts.length ? parts : [line];
    };

    const flushTable = () => {
      if (tableRows.length < 2) return;
      const headers = tableRows[0];
      const dataRows = tableRows.slice(2); // skip separator
      elements.push(
        <div key={`table-${i}`} className="my-3 overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-md overflow-hidden">
            <thead>
              <tr className="bg-muted">
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-3 py-2 font-medium text-foreground border-b border-border">
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? "bg-muted/30" : ""}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-muted-foreground border-b border-border">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    };

    while (i < lines.length) {
      const line = lines[i];

      // Table detection
      if (line.includes("|") && line.trim().startsWith("|")) {
        const cells = line.split("|").filter((c) => c.trim() !== "");
        if (!inTable) inTable = true;
        tableRows.push(cells);
        i++;
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headings
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-lg font-semibold text-foreground mt-5 mb-2 first:mt-0">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-sm font-semibold text-foreground mt-4 mb-1.5 uppercase tracking-wide">
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Ordered list
      else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <div key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed ml-1 my-0.5">
            <span className="text-primary font-medium shrink-0">{line.match(/^(\d+)\./)?.[1]}.</span>
            <span>{processInline(line.replace(/^\d+\.\s/, ""))}</span>
          </div>
        );
      }
      // Unordered list
      else if (line.startsWith("- ")) {
        elements.push(
          <div key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed ml-1 my-0.5">
            <span className="text-primary mt-1.5 shrink-0">•</span>
            <span>{processInline(line.replace("- ", ""))}</span>
          </div>
        );
      }
      // Empty line
      else if (line.trim() === "") {
        elements.push(<div key={i} className="h-1" />);
      }
      // Regular text
      else {
        elements.push(
          <p key={i} className="text-sm text-muted-foreground leading-relaxed my-0.5">
            {processInline(line)}
          </p>
        );
      }

      i++;
    }

    if (inTable) flushTable();

    return elements;
  };

  return <div className="space-y-0">{renderContent(content)}</div>;
};

export default ReactMarkdownRenderer;
