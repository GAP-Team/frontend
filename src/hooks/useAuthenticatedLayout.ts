import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkIsLoggedIn, getIsUserVerified, getUserDashboard } from "@/utils/auth";
import { ROUTES } from "@/utils/routes";
import { SubItem, SidebarItemTypes } from "@/components/navigation/sidebar/types";

export interface UseAuthenticatedLayoutProps {
  sidebarItems: SidebarItemTypes[];
}

export interface UseAuthenticatedLayoutReturn {
  isReady: boolean;
  selectedItem: SidebarItemTypes | SubItem;
  handleRedirect: (item: SidebarItemTypes | SubItem) => void;
}

export const useAuthenticatedLayout = ({ 
  sidebarItems 
}: UseAuthenticatedLayoutProps): UseAuthenticatedLayoutReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SidebarItemTypes | SubItem>(sidebarItems[0]);

  useEffect(() => {
    // Authentication and verification check
    if (!checkIsLoggedIn()) {
      router.push("/login");
      return;
    }
    
    if (!getIsUserVerified()) {
      router.push(ROUTES.USER_VERIFY);
      return;
    }

    // Sidebar item matching
    const matchedItem = sidebarItems.find(item => 
      item.url === pathname || 
      item.subItems?.find(subItem => subItem.url === pathname)
    );
    
    const selectedSidebarItem = matchedItem?.url === pathname 
      ? matchedItem 
      : matchedItem?.subItems?.find(subItem => subItem.url === pathname) || sidebarItems[0];

    setSelectedItem(selectedSidebarItem);
    setIsReady(true);
  }, [pathname, sidebarItems, router]);

  const handleRedirect = (item: SidebarItemTypes | SubItem): void => {
    if (item.url) {
      setSelectedItem(item);
      router.push(item.url);
    }
  };

  return {
    isReady,
    selectedItem,
    handleRedirect,
  };
};