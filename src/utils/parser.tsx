import Blockquote from "@/components/blockquote";
import ReactDom from "next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";

type contextType = { identifire: string; type: ElementType };

const identifyNodeElement = (text: string): contextType | null => {
  const elementTypes: Record<string, ElementType> = {
    "# ": "h1",
    "## ": "h2",
    "### ": "h3",
    "#### ": "h4",
    "##### ": "h5",
    "###### ": "h6",
    "> ": "blockquote",
  };

  for (const [prefix, elementType] of Object.entries(elementTypes)) {
    if (text.startsWith(prefix)) {
      return { identifire: prefix, type: elementType };
    }
  }

  return null;
};

const renderElement = (context: contextType, content: string): string => {
  if (context.type === "blockquote") {
    return renderCustomBlockquote(content);
  }

  return `<${context.type}>${content.replace(context.identifire, "")}</${
    context.type
  }>`;
};

const renderCustomBlockquote = (input: string): string => {
  return ReactDom.renderToString(<Blockquote>{input}</Blockquote>);
};

export function parseContent(text: string[]): string {
  return text
    .map((line) => ({ content: line, context: identifyNodeElement(line) }))
    .map((lineData) =>
      lineData.context?.type
        ? renderElement(lineData.context, lineData.content)
        : "<br/>"
    )
    .join("\n");
}
