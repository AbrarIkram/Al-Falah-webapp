import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Users from "./users/Users";
import Settings from "./Settings/Settings";
import Students from "./students/Students";
import Teachers from "./teachers/Teachers";
import Dashboards from "./Dashboards/Dashboards";

const theme = {
  light: {
    bg: {
      primary: "bg-[#F6F1E9]",
      secondary: "bg-white",
      surface: "bg-[#FDF8F2]",
    },
    text: {
      primary: "text-[#4F200D]",
      secondary: "text-[#7A5C48]",
    },
    border: "border-[#E0D0C1]",
    button: {
      primary: "bg-[#FF9A00] hover:bg-[#E68A00] text-white",
      secondary:
        "bg-[#FDF8F2] hover:bg-[#F6F1E9] text-[#4F200D] border border-[#E0D0C1]",
      danger: "bg-[#FF6B6B] hover:bg-[#FF5252] text-white",
    },
  },
};

function App() {
  const [activePage, setActivePage] = useState("dashboards");

  const renderPage = () => {
    switch (activePage) {
      case "users":
        return <Users />;
      case "students":
        return <Students />;
      case "teachers":
        return <Teachers />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboards />;
    }
  };

  return (
    <div className={`flex h-screen ${theme.light.bg.primary}`}>
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <div
            className={`min-h-full ${theme.light.bg.secondary} rounded-xl shadow-sm p-6 border ${theme.light.border}`}
          >
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;