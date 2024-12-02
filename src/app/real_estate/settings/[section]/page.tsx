import CompanyProfile from "@/screens/dashboard/settings/CompanyProfile";
import UserProfile from "@/screens/dashboard/settings/UserProfile";
import React from "react";

export default function SectionPage({
  params,
}: {
  params: { section: string };
}): React.ReactNode {
  const { section } = params;

  const renderSection = (): React.ReactNode => {
    switch (section) {
      case "user_profile":
        return <UserProfile />;
      case "company_profile":
        return <CompanyProfile />;
    }
  };

  return <div>{renderSection()}</div>;
}
