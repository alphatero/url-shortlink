import React from "react";
import { Icon } from ".";
import clsx from "clsx";
import { createPortal } from "react-dom";

export function Toast({ type }) {
  return createPortal(
    <div
    className={clsx(
      "relative",
      "flex items-center gap-4 p-2 rounded w-80 border-2",
      type === "success" && "bg-white border-green text-green"
    )}
    >
      <span className="w-8">
        {type === "sucees" && <Icon.Success />}
      </span>
      <p>this is a toast</p>
    </div>,
    document.getElementById("notice")
  );
}
