import React from "react";
import MessagesContainer from "./MessagesContainer";
import HeaderSection from "../HeaderSection";
import { messages, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableSection from "../../../../components/common/ScrollableSection";

const ChatPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  return (
    <ScrollableSection>
      <HeaderSection
        titletext="NEUE NACHRICHTEN"
        count={3}
        overviewText="Alle anzeigen"
      />
      <MessagesContainer messages={messages} />
    </ScrollableSection>
  );
};

export default ChatPanel;
