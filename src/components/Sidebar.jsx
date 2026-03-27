import { useState } from "react";
import {
  FaUsers,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaCog,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { FiGrid } from "react-icons/fi";

function Sidebar({ activePage, setActivePage, theme }) {
  const [open, setOpen] = useState(true);

  const menu = [
    { name: "Dashboards", key: "dashboards", icon: <FaTachometerAlt />},
    { name: "Students", key: "students", icon: <FaGraduationCap /> },
    { name: "Teachers", key: "teachers", icon: <FaChalkboardTeacher /> },
    { name: "Users", key: "users", icon: <FaUsers /> },
    { name: "Settings", key: "settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`
        h-screen flex flex-col flex-shrink-0
        transition-all duration-300
        ${open ? "w-64" : "w-20"}
        ${theme.light.bg.primary}
        ${theme.light.border}
        border-r
      `}
    >
      {/* Top */}
      <div
        className={`flex items-center justify-between p-4 border-b ${theme.light.border}`}
      >
        {open && (
          <h1 className={`font-bold text-lg ${theme.light.text.primary}`}>
            Al Falah
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className={`${theme.light.button.secondary} w-9 h-9 rounded-lg flex items-center justify-center`}
        >
          <FaBars className={`${open ? "rotate-0" : "rotate-180"} transition`} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 px-2 space-y-1">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition
              ${
                activePage === item.key
                  ? theme.light.button.primary
                  : theme.light.button.secondary
              }
              ${!open ? "justify-center" : ""}
            `}
          >
            <span className="text-lg">{item.icon}</span>

            {open && <span>{item.name}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className={`border-t ${theme.light.border} p-3 space-y-2`}>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.light.button.secondary} ${
            !open ? "justify-center" : ""
          }`}
        >
          <FaUser />
          {open && <span>Profile</span>}
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${theme.light.button.danger} ${
            !open ? "justify-center" : ""
          }`}
        >
          <FaSignOutAlt />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;