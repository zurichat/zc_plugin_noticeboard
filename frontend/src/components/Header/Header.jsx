import React from "react";

import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header__wraps">
                    <form className="header__form">
                        <input
                            className="header__form-input"
                            type="text"
                            placeholder="Search here"
                        />
                        <p className="header__search-icon">a</p>
                    </form>
                    <div className="header__settings">
                        <p>aa</p>
                        {/* <img className="header__setiings-icon" src="" /> */}
                    </div>
                    <div className="header__profile">
                        {/* <img className="header__profile-image" src="" /> */}
                    </div>
            </div>
        </header>
    );
};

export default Header;
