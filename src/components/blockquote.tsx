import React from "react";

export default function Blockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h3>Custom blockquote -✨ {children} ✨</h3>;
}
