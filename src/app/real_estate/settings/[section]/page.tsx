import CompanyProfile from "@/screens/dashboard/settings/CompanyProfile";
import React from "react";

export default function SectionPage({
    params,
}: {
    params: { section: string };
}): React.ReactNode {
    const { section } = params;

    const renderSection = (): React.ReactNode => {
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
