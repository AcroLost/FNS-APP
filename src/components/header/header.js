import React from 'react';

import './Header.scss';
import logo from '../../image/logo.png';

import { Button } from 'antd';

import { UnorderedListOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import fire from '../../firebase';

const Header = ({ history, toggleMenu }) => {

    const signOut = () => {
        fire.auth()
            .signOut().then(() => {
                history.push('/sign/login');
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="header">

            <div className="header__wrapper">

                <img className="logo" src={logo} alt="logo" />

                <span className="name">
                    ФНС проверка контрагента
                </span>
                {/* <span onClick={signOut}>Выход</span> */}
                <Button onClick={toggleMenu} className="menu" type="primary" icon={<UnorderedListOutlined />} size="large"></Button>
            </div>
        </div>
    );
}

const HeaderContainer = withRouter(Header);

export default HeaderContainer;