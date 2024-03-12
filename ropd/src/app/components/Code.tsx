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
  };

  return (
    <div className="mt-2 text-left text-xs font-mono">
      <div className="flex justify-between">
        <div className="">
          {props.fileName} - {props.language}
        </div>
        <button onClick={toggleExpanded}>
          {expanded ? "Collapse" : "Expand"}
        </button>
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
    </div>
  );
};

export default Code;
