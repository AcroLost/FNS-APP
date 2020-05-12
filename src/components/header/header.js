import React from 'react';

import './Header.scss';
import logo from '../../image/logo.png';

import { Button } from 'antd';

import { UnorderedListOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const Header = ({ history, companyNull, toggleMenu }) => {

    return (
        <div className="header">

            <div className="header__wrapper">

                <img className="logo" src={logo} alt="logo" onClick={() => {
                    history.push('/home');
                    companyNull();
                }} />

                <span className="name">
                    ФНС проверка контрагента
                </span>

                <Button onClick={toggleMenu} className="menu" type="primary" icon={<UnorderedListOutlined />} size="large"></Button>
            </div>
        </div>
    );
}

const HeaderContainer = withRouter(Header);

export default HeaderContainer;