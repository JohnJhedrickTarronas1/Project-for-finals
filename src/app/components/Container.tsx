import React from "react";

export default function Container({
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={[
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}