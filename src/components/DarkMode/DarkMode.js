import React, { useState } from "react";
import "./DarkMode.css";

function DarkMode({onDarkModeChange}) {

    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        console.log("Is Dark Mode On::", isChecked);
        setIsChecked(!isChecked);
        onDarkModeChange(!isChecked);
    }

    return (
        <label class="switch">
            <input type="checkbox" checked={isChecked}
                onChange={handleChange} />
            <span class="slider round"></span>
        </label>
    );
}

export default DarkMode;
