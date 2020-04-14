import React from 'react';

import './header.scss';
import logo from '../../image/logo.png';

const Header = () => {

    return (
        <div className="header">

            <div className="header__wrapper">

                <img src={logo} alt="logo" />

                <span>
                    ФНС проверка контрагента
                </span>

            </div>
        </div>
    );
}

export default Header;