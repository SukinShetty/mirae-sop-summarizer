import { useState } from "react";
import AccessScreen from "./AccessScreen";
import ChatInterface from "./ChatInterface";

const Index = () => {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <AccessScreen onEnter={() => setAuthenticated(true)} />;
  }

  return <ChatInterface />;
};

export default Index;
