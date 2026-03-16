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
    <aside className="w-[220px] shrink-0 bg-muted/40 flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <img src={miraeLogo} alt="Mirae Asset" className="h-6 object-contain" />
      </div>

      <div className="px-3 py-2">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-md text-foreground hover:bg-muted transition-colors duration-150"
        >
          <Plus className="w-3.5 h-3.5" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1 px-2">
          Recent
        </p>
        <div className="space-y-px">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-[13px] truncate transition-colors duration-150 ${
                activeChatId === chat.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <MessageSquare className="w-3 h-3 inline-block mr-1.5 -mt-0.5 opacity-40" />
              {chat.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
