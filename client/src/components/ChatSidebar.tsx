"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DUMMY_CHATS = [
  {
    id: 1,
    user: "Alice",
    messages: [
      { text: "Hello", sender: "Alice" },
      { text: "How are you?", sender: "Me" },
    ],
  },
  {
    id: 2,
    user: "Bob",
    messages: [
      { text: "Hey", sender: "Bob" },
      { text: "What’s up?", sender: "Me" },
    ],
  },
];

const ChatSidebar = ({ isOpen, onClose }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chats, setChats] = useState(DUMMY_CHATS);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat !== null) {
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, { text: newMessage, sender: "Me" }],
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setNewMessage("");
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Chats</h2>
        <Button onClick={onClose}>
          <X size={24} />
        </Button>
      </div>
      <div className="p-4">
        {selectedChat !== null ? (
          <div>
            <Button onClick={() => setSelectedChat(null)} className="mb-4">
              Back
            </Button>
            <div className="space-y-2">
              {chats
                .find((chat) => chat.id === selectedChat)
                ?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${message.sender === "Me" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
                    {message.text}
                  </div>
                ))}
            </div>
            <textarea
              className="w-full p-2 mt-4 border rounded"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}></textarea>
            <Button onClick={handleSendMessage} className="mt-2">
              Send
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className="cursor-pointer"
                onClick={() => setSelectedChat(chat.id)}>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-semibold">{chat.user}</p>
                    <p className="text-sm text-gray-500">
                      {chat.messages[chat.messages.length - 1].text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
