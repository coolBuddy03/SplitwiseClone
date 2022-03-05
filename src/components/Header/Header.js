import React, { useState } from "react";
import DarkMode from "../DarkMode/DarkMode";
import "./Header.css";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const onDarkModeChange = (isDarkMode) => {
    const el = document.getElementsByTagName('body')[0];
    if(isDarkMode){
      el.style.backgroundColor = "black";
    }else{
      el.style.backgroundColor = "white";
    }
    setIsDarkMode(isDarkMode);    
  }
  return (
    <div id="body-min-width">
      <div className="navbar navbar-fixed-top">
        <div className="navbar-inner" style={{
          backgroundColor: isDarkMode ? 'black' : ''
        }}>
          <div className="container">
            <a className="brand" href="/">
              <img
                id="logo"
                src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
              />
            </a>
            <DarkMode onDarkModeChange={onDarkModeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
