import { motion } from "framer-motion";
import miraeLogo from "@/assets/mirae-logo.png";

interface AccessScreenProps {
  onEnter: () => void;
}

const AccessScreen = ({ onEnter }: AccessScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-lg p-10 text-center shadow-sm">
          <img
            src={miraeLogo}
            alt="Mirae Asset"
            className="h-10 mx-auto mb-8 object-contain"
          />

          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Internal SOPs Summarizer
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Ask questions from internal SOPs, policies, and process documents
          </p>

          <button
            onClick={onEnter}
            className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-md hover:opacity-90 transition-opacity duration-150"
          >
            Enter
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          For authorized personnel only
        </p>
      </motion.div>
    </div>
  );
};

export default AccessScreen;
