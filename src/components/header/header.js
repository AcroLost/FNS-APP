import React from 'react';

import './header.scss';
import logo from '../../image/logo.png';
import { withRouter } from 'react-router-dom';

const Header = ({ history, companyNull }) => {

    return (
        <div className="header">

            <div className="header__wrapper">

                <img style={{ cursor: 'pointer' }} src={logo} alt="logo" onClick={() => {
                    history.push('/home');
                    companyNull();
                }} />

                <span>
                    ФНС проверка контрагента
                </span>

            </div>
        </div>
    );
}

const HeaderContainer = withRouter(Header);

export default HeaderContainer;