import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Star,
  Settings,
  LogOut,
  //Menu,
  UserRound,
  MapPin,
  Package,
} from "lucide-react";
//import { Button } from "./ui/combined-ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/combined-ui";

const sidebarItems: { title: string; icon: any; href: string }[] = [];

const userType =
  localStorage.getItem("userType") == "individual"
    ? "customer"
    : localStorage.getItem("userType");

if (userType == "organizer" || userType == "vendor") {
  sidebarItems.push({
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/" + userType + "/dashboard",
  });
}
sidebarItems.push({
  title: "Bookings",
  icon: CalendarDays,
  href: "/" + userType + "/bookings",
});
if (userType == "customer" || userType == "organizer") {
  sidebarItems.push({
    title: "RSVP",
    icon: Package,
    href: "/" + userType + "/RSVP",
  });
}
sidebarItems.push({
  title: "Reviews",
  icon: Star,
  href: "/" + userType + "/reviews",
});
if (userType == "vendor") {
  sidebarItems.push(
    {
      title: "User Management",
      icon: UserRound,
      href: "/vendor/usermanagement",
    },
    { title: "Track", icon: MapPin, href: "/vendor/track" }
  );
}
if (userType == "customer" || userType == "vendor") {
  sidebarItems.push({
    title: "Settings",
    icon: Settings,
    href: "/" + userType + "/settings",
  });
}

interface SidebarProps {
  // isCollapsed: boolean;
  // setIsCollapsed: (collapsed: boolean) => void;
  logout: () => void; // Add logout prop - nag add ng ibang logout props sa mga gumagamamit sa "Sidebar", using only console.log
}

export function Sidebar({
  /*isCollapsed,*/ /*setIsCollapsed,*/ logout,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCollapsed = false; // instead of removing props for future purposes and current interactions (pls)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed left-0 top-0 h-screen w-64 bg-[#2B579A] dark:bg-[#1E3A6D] transition-all duration-300">
        {/* Logo at the top of sidebar */}
        <div className="p-6 mb-6 flex justify-center">
          <a href="/" className="flex items-center justify-center">
            <img src="/src/assets/OrganizerLogo.png" alt="Logo" className="h-24 w-auto object-contain" />
          </a>
        </div>

         {/* Sidebar Navigation Items */}
         <div className="flex flex-col space-y-1 px-2">
          {sidebarItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`relative flex h-10 w-full items-center gap-3 rounded-md px-3 text-white transition-colors hover:bg-[#1E3A6D]
                ${location.pathname === item.href ? "bg-[#1E3A6D] after:w-full" : "after:w-0"}
                relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:transition-all hover:after:w-full`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-3 mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`relative flex h-10 w-full items-center gap-3 rounded-md px-3 text-white transition-colors hover:bg-[#1E3A6D]
                ${location.pathname === '/logout' ? "bg-[#1E3A6D] after:w-full" : "after:w-0"}
                relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-yellow-400 after:transition-all hover:after:w-full`}
                onClick={logout} // Use the passed logout function instead of alert
              >
                <LogOut className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent
                side="right"
                className="border-0 bg-gray-900 text-white"
              >
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
