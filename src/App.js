import React from 'react';

import 'antd/dist/antd.css';
import './App.scss';

import MapBlock from './components/MapBlock/MapBlock';
import QueryHistory from './components/QueryHistory/QueryHistory';
import CompanyDescription from './components/CompanyDescription/CompanyDescription';
import FullDescription from './components/FullDescription/FullDescription';
import { Route, Switch, Redirect } from 'react-router-dom';
import CompanyList from './components/CompanyList/CompanyList';
import HeaderContainer from './components/Header/Header';
import { useState } from 'react';
import SearchBlockContainer from './components/SearchBlock/SearchBlockContainer';
import RegAuth from './components/RegAuth/RegAuth';
import { useEffect } from 'react';
import fire from './firebase';

const App = ({ history, company, regions }) => {

  const [menu, setMenu] = useState('none');

  useEffect(() => {
    fire.auth().onAuthStateChanged(userIn => {
      if (userIn) {
        history.push('/home');
      } else {
        history.push('/sign/login');
      }
    });
  }, []);

  const toggleMenu = () => {

    if (menu === 'block') {
      setMenu('none');
    } else {
      setMenu('block');
    }
  }

  return (
    <div className="main">

      <HeaderContainer toggleMenu={toggleMenu} />

      <div className="search">
        <div className="search__wrapper">

          <Route path='/home' render={() => {

            return <div>
              <SearchBlockContainer regionsListState={regions} />
              <MapBlock />
            </div>
          }}
          />

          <Switch>

            <Route exact path='/home/company_list' render={() =>
              <CompanyList />}
            />
            <Route exact path={`/home/company_list/:company/check`} render={() =>
              <CompanyDescription status={company.Статус} />}
            />
            <Route exact path='/home/company_list/:company/full_information' render={() =>
              <FullDescription />}
            />

            <Route path='/sign' render={() =>
              <RegAuth />
            } />

            <Route exact path="/" render={() => <Redirect to="/home" />} />

          </Switch>

          <QueryHistory menu={menu} toggleMenu={toggleMenu} />

        </div>
      </div>
    </div>
  );
}

export default App;

