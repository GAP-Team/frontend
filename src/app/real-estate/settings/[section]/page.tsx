import UserProfile from "@/screens/dashboard/settings/UserProfile";
import ChangeEmail from "@/screens/dashboard/settings/ChangeEmail";
import DeleteAccount from "@/screens/dashboard/settings/DeleteAccount";
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
        return <ChangeEmail />;
      case "password-change":
        return <ChangePassword />;
      case "delete-account":
        return <DeleteAccount />;
    }
  };

  return <div>{renderSection()}</div>;
}
