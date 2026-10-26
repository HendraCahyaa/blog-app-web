import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => {
  const components: Components = {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
    p: ({ children }) => <p className="text-base">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 list-disc pl-8">{children}</ul>,
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal pl-8">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
