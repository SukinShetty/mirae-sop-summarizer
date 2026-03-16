import { Plus, MessageSquare } from "lucide-react";
import miraeLogo from "@/assets/mirae-logo.png";
import { ChatSession, sampleQuestions } from "@/lib/mockData";

interface ChatSidebarProps {
  chatHistory: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onSampleQuestion: (q: string) => void;
  isOpen: boolean;
}

const ChatSidebar = ({
  chatHistory,
  activeChatId,
  onNewChat,
  onSelectChat,
  onSampleQuestion,
  isOpen,
}: ChatSidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside className="w-[260px] shrink-0 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <img src={miraeLogo} alt="Mirae Asset" className="h-7 object-contain" />
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity duration-150"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
          Recent
        </p>
        <div className="space-y-0.5">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm truncate transition-colors duration-150 ${
                activeChatId === chat.id
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
              {chat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Sample Questions */}
      <div className="p-3 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
          Try asking
        </p>
        <div className="space-y-1">
          {sampleQuestions.slice(0, 3).map((q, i) => (
            <button
              key={i}
              onClick={() => onSampleQuestion(q)}
              className="w-full text-left px-3 py-2 text-xs text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 line-clamp-2"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
