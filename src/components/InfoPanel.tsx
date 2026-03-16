import { FileText, Zap, Shield, BookOpen } from "lucide-react";

const InfoPanel = () => {
  return (
    <aside className="w-[300px] shrink-0 bg-card border-l border-border h-full overflow-y-auto hidden lg:block">
      <div className="p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Demo Context</h2>

        <div className="space-y-4">
          {/* Use Case */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Use Case</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Internal document query assistant for operations and support teams.
            </p>
          </div>

          {/* Document Types */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Document Types</h3>
            </div>
            <ul className="space-y-1.5">
              {["SOPs", "Policies", "Process Notes", "Service Guidance"].map((doc) => (
                <li key={doc} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-brand-orange" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Benefits</h3>
            </div>
            <ul className="space-y-1.5">
              {[
                "Faster support resolution",
                "Quick answers from SOPs",
                "Better access to internal knowledge",
                "Reduced training overhead",
              ].map((b) => (
                <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-orange shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-status-green" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">Security</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All data stays within the organization. No external API calls to third-party LLMs.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InfoPanel;
