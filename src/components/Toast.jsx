import React, { createContext, useState, useCallback, useContext } from "react";
import { createPortal } from "react-dom";
import { Icon } from ".";
import clsx from "clsx";
import { v4 as uuid } from "uuid";

export function Toast({ type }) {
  return createPortal(
    <div
      className={clsx(
        "relative",
        "flex items-center gap-4 p-2 rounded w-80 border-2",
        type === "success" && "bg-white border-green text-green"
      )}
    >
      <span className="w-8">{type === "sucees" && <Icon.Success />}</span>
      <p>this is a toast</p>
    </div>,
    document.getElementById("notice")
  );
}

const Context = createContext(undefined);

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const setMessage = useCallback(
    (message) => {
      if (!message) return;

      const id = uuid();

      setMessages((queue) => [...queue, { id, message }]);

      setTimeout(() => {
        setMessages((queue) => queue.filter((pair) => pair.id !== id));
      }, 2000);
    },
    [setMessages]
  );

  return (
    <Context.Provider value={setMessage}>
      {children}

      {messages.map(({ id }) => (
        <Toast type="success" key={id} />
      ))}
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}
