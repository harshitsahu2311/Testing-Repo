import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import useSidebar from "@/hooks/useSidebar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { sidebarOpen, openSidebar, closeSidebar } = useSidebar();
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();

  // Check for authentication token
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    // Allow direct access if token exists
    if (!token && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className=" lg:flex lg:flex-row lg:h-screen">
      {/* Sidebar for larger screens */}
      <div className="h-screen w-[200px] bg-[#FAFAFA] border-r border-[#F0F0F0] hidden lg:block fixed lg:relative">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-[200px] bg-[#FAFAFA] border-r border-[#F0F0F0] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:w-[calc(100%-200px)]">
        {/* Fixed Header for Mobile and Tablet */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#F0F0F0] z-30 lg:hidden">
          <div className="flex items-center h-full px-4">
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              onClick={openSidebar}
              aria-label="Open menu"
            >
              <MenuIcon className="text-gray-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-gray-800">Flo</h1>
            </div>
          </div>
        </div>

        {/* Main Content with padding for fixed header */}
        <div className="flex-1 overflow-y-auto pt-16 lg:pt-0">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
