import React from "react";

const renderInline = (text, keyPrefix) => text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
  if (part.startsWith("**") && part.endsWith("**")) {
    return <strong key={`${keyPrefix}-${index}`} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
  }
  return part;
});

export default function BlogContent({ content }) {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        const heading = lines[0].match(/^(#{2,3})\s+(.+)$/);
        if (heading) {
          const Heading = heading[1].length === 2 ? "h2" : "h3";
          return (
            <Heading key={`heading-${index}`} className="text-2xl md:text-3xl font-bold text-foreground">
              {renderInline(heading[2], `heading-${index}`)}
            </Heading>
          );
        }

        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={`list-${index}`} className="list-disc space-y-2 pl-6 text-muted-foreground leading-8">
              {lines.map((line, lineIndex) => (
                <li key={`list-${index}-${lineIndex}`}>{renderInline(line.slice(2), `list-${index}-${lineIndex}`)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`paragraph-${index}`} className="text-muted-foreground leading-8">
            {lines.map((line, lineIndex) => (
              <React.Fragment key={`paragraph-${index}-${lineIndex}`}>
                {lineIndex > 0 && <br />}
                {renderInline(line, `paragraph-${index}-${lineIndex}`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
