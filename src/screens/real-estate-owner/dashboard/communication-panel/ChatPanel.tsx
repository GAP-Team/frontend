import React from "react";
import HeaderSection from "../HeaderSection";
import { messages, DashboardComponentsProps } from "@/utils/Constants";
import MessagesContainer from "./MessagesContainer";
import { Stack } from "@mui/material";

const ChatPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  return (
    <Stack height="100%">
      <HeaderSection
        titletext="NEUE NACHRICHTEN"
        count={3}
        overviewText="Alle anzeigen"
      />
      <MessagesContainer messages={messages} />
    </Stack>
  );
};

export default ChatPanel;
