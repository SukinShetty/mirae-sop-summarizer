import { PanelLeftClose, PanelLeft, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onClearChat: () => void;
}

const ChatHeader = ({ sidebarOpen, onToggleSidebar, onClearChat }: ChatHeaderProps) => {
  return (
    <header className="h-11 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-150"
        >
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
        </button>
        <span className="text-[13px] font-medium text-foreground">Internal SOP Summarizer</span>
      </div>
      <button
        onClick={onClearChat}
        className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-colors duration-150"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </header>
  );
};

export default ChatHeader;
