import { FC } from "react";
import { marked } from "marked";

export const MarkdownText: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const parsedText = marked.parse(text, {
    headerIds: undefined,
    headerPrefix: undefined,
    mangle: undefined,
  });

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: parsedText,
      }}
    />
  );
};
