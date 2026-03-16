import { useState, useCallback } from "react";
import { ChatMessage, ChatSession, mockChatHistory } from "@/lib/mockData";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatArea from "@/components/ChatArea";

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
    <div className="h-screen flex bg-background overflow-hidden">
      <ChatSidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        isOpen={sidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((p) => !p)}
          onClearChat={handleClearChat}
        />
        <ChatArea
          messages={messages}
          setMessages={setMessages}
          onFirstMessage={handleFirstMessage}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
