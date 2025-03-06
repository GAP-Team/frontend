import UserProfile from "@/screens/dashboard/settings/UserProfile";
import EmailChange from "@/screens/dashboard/settings/EmailChange";
import CompanyProfile from "@/screens/dashboard/settings/CompanyProfile";
import ChangePassword from "@/screens/dashboard/settings/ChangePassword";

export default function SectionPage({
  params,
}: {
  params: { section: string };
}): React.ReactNode {
  const { section } = params;

  const renderSection = (): React.ReactNode => {
    switch (section) {
      case "user-profile":
        return <UserProfile />;
      case "company-profile":
        return <CompanyProfile />;
      case "email-change":
        return <EmailChange />;
      case "password-change":
        return <ChangePassword />;
    }
  };

  return <div>{renderSection()}</div>;
}
