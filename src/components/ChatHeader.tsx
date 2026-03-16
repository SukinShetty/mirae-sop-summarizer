import { PanelLeftClose, PanelLeft, Trash2, CircleCheck } from "lucide-react";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onClearChat: () => void;
}

const ChatHeader = ({ sidebarOpen, onToggleSidebar, onClearChat }: ChatHeaderProps) => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors duration-150"
        >
          {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
        </button>
        <h1 className="text-sm font-semibold text-foreground">Internal Process Assistant</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-status-green font-medium">
          <CircleCheck className="w-3.5 h-3.5" />
          Connected to Knowledge Base
        </div>
        <button
          onClick={onClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted rounded-md transition-colors duration-150"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
