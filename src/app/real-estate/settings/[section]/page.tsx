import UserProfile from "@/screens/real_estate_owner/settings/UserProfile";
import ChangeEmail from "@/screens/real_estate_owner/settings/ChangeEmail";
import DeleteAccount from "@/screens/real_estate_owner/settings/DeleteAccount";
import CompanyProfile from "@/screens/real_estate_owner/settings/CompanyProfile";
import ChangePassword from "@/screens/real_estate_owner/settings/ChangePassword";

export default function SettingSectionPage({
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
