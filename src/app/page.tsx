"use client";

import { Message } from "@prisma/client";
import React, { useEffect } from "react";
import { getMessages, sendMessage } from "./getMessages";

export default function Home() {
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    getMessages().then((dbMessages) => {
      setMessages(dbMessages);
      console.log("retrieved messages:", dbMessages);
    });
  }, []);

  const onSubmit = async () => {
    if (inputValue) {
      await sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <main className="m-auto w-4/5 border h-screen">
      <div className="w-full flex justify-center">
        <input
          type="text"
          value={inputValue}
          placeholder={"Input message..."}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />

        <button onClick={onSubmit} type="submit">
          Send
        </button>
      </div>

      <div className="flex border border-red-500">
        {messages.map(({ id, text }) => (
          <div key={id}>{text}</div>
        ))}
      </div>
    </main>
  );
}
