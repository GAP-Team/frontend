import React from "react";
import HeaderSection from "../HeaderSection";
import ScrollableLayout from "@/components/layout/ScrollableLayout";
import { messages, DashboardComponentsProps } from "@/utils/Constants";
import MessagesContainer from "./MessagesContainer";

const ChatPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  return (
    <ScrollableLayout>
      <HeaderSection
        titletext="NEUE NACHRICHTEN"
        count={3}
        overviewText="Alle anzeigen"
      />
      <MessagesContainer messages={messages} />
    </ScrollableLayout>
  );
};

export default ChatPanel;
