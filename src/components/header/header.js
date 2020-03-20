import React from 'react';

import './header.css';

const Header = () => {

    return (
        <div className="header">

            <div className="header__wrapper">

                <img src={require('../../image/logo.png')} alt="logo" style={{ width: 65, height: 65 }} />

                <span>
                    ФНС поиск организаций
                </span>

            </div>
        </div>
    );
}

export default Header;