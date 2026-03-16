import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { ChatMessage as ChatMessageType, sendMessageToAgent, sampleQuestions } from "@/lib/mockData";
import ChatMessage from "./ChatMessage";
import LoadingIndicator from "./LoadingIndicator";

interface ChatAreaProps {
  messages: ChatMessageType[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  onFirstMessage?: (title: string) => void;
}

const ChatArea = ({ messages, setMessages, onFirstMessage }: ChatAreaProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    if (messages.length === 0 && onFirstMessage) {
      onFirstMessage(msg.slice(0, 40) + (msg.length > 40 ? "..." : ""));
    }

    try {
      const response = await sendMessageToAgent(msg);
      const assistantMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] pt-20">
              <p className="text-muted-foreground text-sm text-center mb-6">
                Ask anything about internal SOPs, policies, and process documents.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {sampleQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 text-xs text-muted-foreground border border-border rounded-full hover:bg-muted transition-colors duration-150"
                  >
                    {q.length > 45 ? q.slice(0, 45) + "…" : q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-end gap-2 border border-border rounded-xl bg-card px-3 py-2 focus-within:ring-1 focus-within:ring-ring/30 transition-shadow duration-150">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[36px] max-h-[120px] py-1.5 leading-relaxed"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-1.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-30 hover:opacity-90 transition-opacity duration-150 mb-0.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
