import { useState } from "react";

const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return { sidebarOpen, openSidebar, closeSidebar, toggleSidebar };
};

export default useSidebar;
