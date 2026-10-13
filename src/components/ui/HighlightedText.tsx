/**
 * Renders `text` with the first occurrence of `highlight` in Fraunces italic (light weight,
 * band accent color). Falls back to plain text when the highlight isn't found.
 */
export function HighlightedText({
  text,
  highlight,
  className = "font-light text-(--accent-text)",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <em className={className}>{highlight}</em>
      {text.slice(index + highlight.length)}
    </>
  );
}
