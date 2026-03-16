import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 justify-start"
    >
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="bg-card border border-border rounded-lg p-5 w-[400px]">
        <div className="space-y-2.5">
          <div className="h-3 shimmer rounded w-3/4" />
          <div className="h-3 shimmer rounded w-full" />
          <div className="h-3 shimmer rounded w-2/3" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingIndicator;
