import React, { useState } from "react";
import "./Header.css";

function Header() {
  return (
    <div id="body-min-width">
      <div className="navbar navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <a className="brand" href="/">
              <img
                id="logo"
                src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
