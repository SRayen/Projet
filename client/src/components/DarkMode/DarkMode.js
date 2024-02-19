/** @format */

import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";
import useThemeStore from "../../stores/themeStore";

const DarkMode = () => {
  const { isDarkMode, setIsDarkMode } = useThemeStore();

  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
  };
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
      setIsDarkMode(true);
    } else {
      setLightMode();
      setIsDarkMode(false);
    }
  };

  console.log(isDarkMode);
  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
