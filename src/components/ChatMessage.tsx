import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/lib/mockData";
import ReactMarkdownRenderer from "./ReactMarkdownRenderer";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      <div
        className={`max-w-[680px] ${
          isUser
            ? "bg-primary text-primary-foreground px-4 py-3 rounded-lg rounded-br-sm"
            : "bg-card border border-border rounded-lg p-5"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <ReactMarkdownRenderer content={message.content} />
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
