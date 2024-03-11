import React, { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeProps {
  code: string;
  ariaLabel: string;
  fileName: string;
  language: string;
}

const Code = (props: CodeProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded) {
      // Scroll to the bottom when expanding
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to the top when collapsing
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-left text-xs font-mono">
      <div className="code-info-bar">
        {props.fileName} {/* Display the additional info */}
      </div>
      <div
        style={{
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          maxHeight: expanded ? "100%" : "0",
          minHeight: !expanded ? "100%" : "0",
        }}
      >
        <CopyBlock
          text={props.code}
          language={props.language}
          showLineNumbers={true}
          theme={dracula}
          codeBlock
          aria-label={props.ariaLabel}
        />
      </div>
      <button onClick={toggleExpanded}>
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default Code;
