'use client';

import React, { useState } from "react";
import Image from "next/image";

interface SuggestionProps {
  section: string;
}

const Suggestion: React.FC<SuggestionProps> = ({section}) => {

  const [apiResult, setApiResult] = useState<string | null>(null);

  const handleSubmit = async (value: string) => {
    const res = await fetch("/api/suggestion", {
      method: "POST",
      body: JSON.stringify({ content: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const result = await res.text();
      setApiResult(result); // Assuming your API response has a 'content' property
    } else {
      console.error("API request failed");
    }
  };

  return (
    <div className="text-center">
      <p className="font-bold text-lg">{section}</p>
      {apiResult !== null ? (
        <p dangerouslySetInnerHTML={{ __html: apiResult }} />
      ) : (
        <p>Press Generate!</p>
      )}
      <Image className="m-auto border rounded-lg" src="/path-to-image.jpg" alt="" width={250} height={300} />
      <button className="hover:border p-2 rounded-lg" onClick={() => handleSubmit(section)}>Generate</button>
    </div>
  );
}

export default Suggestion;
