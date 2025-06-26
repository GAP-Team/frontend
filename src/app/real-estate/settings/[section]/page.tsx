import UserProfile from "@/components/features/settings/UserProfile";
import ChangeEmail from "@/components/features/settings/ChangeEmail";
import DeleteAccount from "@/components/features/settings/DeleteAccount";
import CompanyProfile from "@/components/features/settings/CompanyProfile";
import ChangePassword from "@/components/features/settings/ChangePassword";

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
