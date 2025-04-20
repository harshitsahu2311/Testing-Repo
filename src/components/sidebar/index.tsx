import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FloLogo from "../../assets/svg/floLogo.svg";
import Icon from "../../utils/icon";
import BikeTaxi from "../../assets/svg/BikeTaxi";
import Tickets from "../../assets/svg/Tickets";
import { useAuthStore } from "../../store/authStore";

const MenuOptions = {
  settings: [
    {
      name: "Recent Activity",
      route: "/recent-activity",
      Icon: <Icon src="bellIcon" />,
      ActiveIcon: <Icon src="bellIcon" color="black" />,
    },
    {
      name: "Logout",
      route: "/login",
      Icon: <Icon src="logoutIcon" />,
      ActiveIcon: <Icon src="logoutIcon" color="black" />,
    },
  ],
  manageSupport: [
    {
      name: "Tickets",
      route: "/tickets",
      Icon: <Tickets />,
      ActiveIcon: <Tickets />,
    },
  ],
  admin: [
    {
      name: "Dashboard",
      route: "/dashboard",
      Icon: <Icon src="homeIcon" />,
      ActiveIcon: <Icon src="homeIcon" color="black" />,
    },
    {
      name: "Rental",
      route: "/rental",
      Icon: <Icon src="rentalIcon" />,
      ActiveIcon: <Icon src="rentalIcon" color="black" />,
    },
    {
      name: "Bike Taxi",
      route: "/bike-taxi",
      Icon: <BikeTaxi />,
      ActiveIcon: <BikeTaxi />,
    },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async (e: React.MouseEvent, route: string) => {
    if (route === "/login") {
      e.preventDefault();
      await logout();
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Logo */}
      <div className="pl-5 h-6 mt-6 mb-4">
        <img className="h-full" src={FloLogo} alt="flo-brand-logo" />
      </div>

      {/* Separator */}
      <p className="border-t border-t-LightGray my-2" />

      {/* Menu Sections */}
      <div className="flex flex-col mt-2 px-2 flex-grow">
        <p className="text-[#020126] pl-3 uppercase my-2 text-[10px]">
          Manage Customers
        </p>
        {MenuOptions.admin.map((link, index) => (
          <div key={index} className="flex my-[2px]">
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full h-10 pl-3 text-xs font-medium rounded-full transition-colors ${
                  isActive
                    ? "bg-[#E2EBF2] text-black font-bold"
                    : "text-[#020126] hover:bg-[#E2EBF2]/40"
                }`
              }
              to={link.route}
            >
              <span>
                {location.pathname === link.route ? link.ActiveIcon : link.Icon}
              </span>
              <span className="pl-2">{link.name}</span>
            </NavLink>
          </div>
        ))}

        <p className="text-[#020126] pl-3 uppercase my-2 text-[10px]">
          Manage Support
        </p>
        {MenuOptions.manageSupport.map((link) => (
          <div key={link.name} className="flex my-[2px]">
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full h-10 pl-3 text-xs font-medium rounded-full transition-colors ${
                  isActive
                    ? "bg-[#E2EBF2] text-black font-bold"
                    : "text-[#020126] hover:bg-[#E2EBF2]/40"
                }`
              }
              to={link.route}
            >
              <span>
                {location.pathname === link.route ? link.ActiveIcon : link.Icon}
              </span>
              <span className="pl-2">{link.name}</span>
            </NavLink>
          </div>
        ))}

        <p className="text-[#020126] pl-3 uppercase my-2 text-[10px]">
          Settings
        </p>
        {MenuOptions.settings.map((link) => (
          <div key={link.name} className="flex my-[2px]">
            <NavLink
              className={({ isActive }) =>
                `flex items-center w-full h-10 pl-3 text-xs font-medium rounded-full transition-colors ${
                  isActive
                    ? "bg-[#E2EBF2] text-black font-bold"
                    : "text-[#020126] hover:bg-[#E2EBF2]/40"
                }`
              }
              to={link.route}
              onClick={(e) => handleLogout(e, link.route)}
            >
              <span>
                {location.pathname === link.route ? link.ActiveIcon : link.Icon}
              </span>
              <span className="pl-2">{link.name}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
