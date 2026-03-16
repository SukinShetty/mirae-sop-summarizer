import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
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
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                How can I help you today?
              </h2>
              <p className="text-sm text-muted-foreground mb-8 text-center max-w-sm">
                Ask me anything about internal SOPs, policies, and process documents.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {sampleQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left px-4 py-3 text-xs text-muted-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150 leading-relaxed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-2 border border-border rounded-lg bg-background px-4 py-2 focus-within:ring-1 focus-within:ring-ring transition-shadow duration-150">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about SOPs, policies, or processes..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[40px] max-h-[120px] py-1.5"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity duration-150"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-2">
            Responses are generated from the uploaded internal knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
