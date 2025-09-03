import { Button } from "@/components/ui/button";
import { Search, Bell, Menu } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="sm" className="hidden sm:flex" aria-label="Search">
        <Search className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="hidden sm:flex" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="md:hidden" aria-label="Mobile menu">
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActionButtons;
