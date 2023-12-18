"use client";

import { ChangeEvent, useState } from "react";

import { parseContent } from "@/utils/parser";
export default function Home() {
  const [nodes, setNodes] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const splittedLines = e.target.value.split("\n");
    setNodes(parseContent(splittedLines));
  };

  return (
    <main className="flex">
      <textarea
        className="border border-black h-screen w-1/2 resize-none p-4"
        placeholder="Start here ...."
        onChange={handleChange}
      />
      <div
        className="border border-black h-screen w-1/2 p-4"
        dangerouslySetInnerHTML={{
          __html:
            nodes ||
            "<p class='preview-placeholder'>Begin typing to generate a preview</p>",
        }}
      ></div>
    </main>
  );
}
