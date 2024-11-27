import { useRouter } from "next/navigation";
import CompanyProfile from "@/screens/dashboard/settings/CompanyProfile";

export default function SectionPage({
    params,
}: {
    params: { section: string };
}) {
    const { section } = params;

    const renderSection = () => {
        switch (section) {
            //   case "user_profile":
            //     return <UserProfileForm />;
            case "company_profile":
                return <CompanyProfile />;
            //   case "billing_data":
            //     return <BillingDataForm />;
        }
    };

    return <div>{renderSection()}</div>;
}
