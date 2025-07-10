import React from "react";
import MessagesContainer from "./MessagesContainer";
import HeaderSection from "../HeaderSection";
<<<<<<<< HEAD:src/screens/real_estate_owner/dashboard/communication_panel/NewsPanel.tsx
import { news, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableLayout from "../../../../components/layout/ScrollableLayout";
========
import { messages, DashboardComponentsProps } from "@/utils/Constants";
import ScrollableSection from "../../../../components/common/ScrollableSection";
>>>>>>>> developer:src/screens/real_estate_owner/dashboard/communication_panel/ChatPanel.tsx

const ChatPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  return (
    <ScrollableLayout>
      <HeaderSection
        titletext="NEUE NACHRICHTEN"
        count={3}
        overviewText="Alle anzeigen"
      />
<<<<<<<< HEAD:src/screens/real_estate_owner/dashboard/communication_panel/NewsPanel.tsx
      <NewsList news={news} />
    </ScrollableLayout>
========
      <MessagesContainer messages={messages} />
    </ScrollableSection>
>>>>>>>> developer:src/screens/real_estate_owner/dashboard/communication_panel/ChatPanel.tsx
  );
};

export default ChatPanel;
