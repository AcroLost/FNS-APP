import React from 'react';

import SearchBlock from './components/search-block/search-block';

import 'antd/dist/antd.css';
import './App.scss';

import MapBlock from './components/map-block';
import QueryHistory from './components/query-history/queryHistory';
import CompanyDescription from './components/company-description/CompanyDescription';
import FullDescription from './components/fullDescription/fullDescription';
import { Route, Switch, Redirect } from 'react-router-dom';
import CompanyList from './components/companyList/companyList';
import HeaderContainer from './components/header/header';
import { useState } from 'react';

const App = ({ error, searchCompany, clearCheckbox, getRegion, getCoordinates, list, loading, verificatePartner, onGetStatement, onGetInformation, company, setLoadingFalse, getCompany, Positive, Negative, fullInformation, historyList, companyNull, regions }) => {

  const [menu, setMenu] = useState('none')

  const toggleMenu = () => {

    if (menu === 'block') {
      setMenu('none');
    } else {
      setMenu('block');
    }
  }

  return (
    <div className="main">

      <HeaderContainer companyNull={companyNull}
        toggleMenu={toggleMenu} />

      <div className="search">
        <div className="search__wrapper">

          <Route path='/home' render={() => {

            return <div>
              <SearchBlock onSearchCompany={searchCompany}
                error={error}
                onClearCheckbox={clearCheckbox}
                getRegion={getRegion}
                regionsListState={regions} />

              <MapBlock list={list}
                onGetCoordinates={getCoordinates}
                loading={loading}
                verificatePartner={verificatePartner}
                getStatement={onGetStatement}
                getInformation={onGetInformation}
                company={company}
                setLoadingFalse={setLoadingFalse} />
            </div>
          }}
          />

          <Switch>

            <Route exact path='/home/company_list' render={() =>

              <CompanyList companyNull={companyNull}
                list={list}
                onGetCompany={getCompany}
                loading={loading} />}
            />
            <Route exact path={`/home/company_list/:company/check`} render={() =>

              <CompanyDescription status={company.Статус}
                positive={Positive}
                negative={Negative} />}
            />
            <Route exact path='/home/company_list/:company/full_information' render={() =>

              <FullDescription information={fullInformation} />}
            />

            <Route exact path="/" render={() => <Redirect to="/home" />} />

          </Switch>

          <QueryHistory menu={menu}
            onSearchCompany={searchCompany}
            historyList={historyList}
            toggleMenu={toggleMenu} />

        </div>
      </div>
    </div>
  );
}

export default App;

