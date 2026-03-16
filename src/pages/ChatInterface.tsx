import { useState, useCallback } from "react";
import { ChatMessage, ChatSession, mockChatHistory } from "@/lib/mockData";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatArea from "@/components/ChatArea";
import InfoPanel from "@/components/InfoPanel";

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(mockChatHistory);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setActiveChatId(null);
  }, []);

  const handleSelectChat = useCallback((id: string) => {
    setActiveChatId(id);
    setMessages([]);
  }, []);

  const handleClearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const handleSampleQuestion = useCallback((q: string) => {
    // The ChatArea component will handle sending
    setMessages([]);
    setActiveChatId(null);
    // Trigger via a small delay so ChatArea is reset first
    setTimeout(() => {
      const input = document.querySelector("textarea") as HTMLTextAreaElement;
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype, "value"
        )?.set;
        nativeInputValueSetter?.call(input, q);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }, 50);
  }, []);

  const handleFirstMessage = useCallback((title: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title,
      timestamp: new Date(),
    };
    setChatHistory((prev) => [newSession, ...prev]);
    setActiveChatId(newSession.id);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex flex-1 min-h-0">
        <ChatSidebar
          chatHistory={chatHistory}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onSampleQuestion={handleSampleQuestion}
          isOpen={sidebarOpen}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <ChatHeader
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((p) => !p)}
            onClearChat={handleClearChat}
          />
          <div className="flex flex-1 min-h-0">
            <ChatArea
              messages={messages}
              setMessages={setMessages}
              onFirstMessage={handleFirstMessage}
            />
            <InfoPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
