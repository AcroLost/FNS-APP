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

const App = ({ searchCompany, clearCheckbox, getRegion, getCoordinates, list, loading, verificatePartner, onGetStatement, onGetInformation, company, setLoadingFalse, getCompany, Positive, Negative, fullInformation, historyList, companyNull, regions, updateRegions }) => {

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
              <SearchBlockContainer onSearchCompany={searchCompany}
                onClearCheckbox={clearCheckbox}
                getRegion={getRegion}
                regionsListState={regions}
                updateRegions={updateRegions} />

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

