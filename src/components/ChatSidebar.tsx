import { Plus, MessageSquare } from "lucide-react";
import miraeLogo from "@/assets/mirae-logo.png";
import { ChatSession } from "@/lib/mockData";

interface ChatSidebarProps {
  chatHistory: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  isOpen: boolean;
}

const ChatSidebar = ({
  chatHistory,
  activeChatId,
  onNewChat,
  onSelectChat,
  isOpen,
}: ChatSidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside className="w-[260px] shrink-0 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <img src={miraeLogo} alt="Mirae Asset" className="h-7 object-contain" />
      </div>

      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted transition-colors duration-150"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">
          Recent
        </p>
        <div className="space-y-0.5">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors duration-150 ${
                activeChatId === chat.id
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5 opacity-50" />
              {chat.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
