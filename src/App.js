import React, { Component } from 'react';


import Service from './services/service';
import SearchBlock from './components/search-block/search-block';


import 'antd/dist/antd.css';
import './App.scss';

import MapBlock from './components/map-block';
import Header from './components/header/header';
import QueryHistory from './components/query-history/queryHistory';
import CompanyDescription from './components/company-description/CompanyDescription';
import FullDescription from './components/fullDescription/fullDescription';
import { Route, withRouter, NavLink } from 'react-router-dom';
import CompanyList from './components/companyList/companyList';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

class App extends Component {

  service = new Service();

  state = {
    list: [],
    company: null,
    error: false,

    loading: false,

    Positive: null,
    Negative: null,

    historyList: [],

    fullInformation: null
  }

  componentDidMount() {

    if (localStorage.getItem('company') !== null) {
      const historyList = JSON.parse(localStorage.getItem('company'));

      this.setState({
        historyList
      });
    }
  }

  componentDidUpdate() {

    localStorage.setItem('company', JSON.stringify(this.state.historyList));

    if (localStorage.getItem('company') !== null) {

      const historyList = JSON.parse(localStorage.getItem('company'));

      if (historyList.length === 6) {
        this.setState((state) => {
          return {
            historyList: state.historyList.slice(1)
          }
        })
      }
    }

  }

  searchCompany = (name) => {

    if (!name) {
      this.setState({
        error: true
      })
      return
    } else {
      this.setState({
        error: false
      })
    }

    this.props.history.push('/company_list');
    const newItem = { name }

    this.setState({
      list: [],
      historyList: [...this.state.historyList, newItem],
    })


    this.setState({
      loading: true,
      Positive: null,
      Negative: null
    });

    this.service
      .getCompany(name)
      .then((list) => {

        list.map((item) => {

          if (item.ЮЛ.ГдеНайдено === 'ИНН') {
            this.getCoordinates([item]);
          }
        })

      });
  }

  getCoordinates(list) {

    list.map((i) => {
      debugger;
      this.service
        .getCoord(i.ЮЛ.АдресПолн)

        .then((res) => {
          this.setState({

            list: [...this.state.list, { ...i, point: res.split(' ') }],
          })
        })

    });

    this.setState({
      loading: false
    })
  }

  verificatePartner = () => {

    this.service
      .verificationPartner(this.state.company.ЮЛ.ИНН)

      .then((res) => {

        this.setState({
          Positive: res.Positive,
          Negative: res.Negative,
        });
      })
  }

  onGetStatement = () => {
    this.service
      .getStatement(this.state.company.ЮЛ.ИНН)
      .then((res) => {
        window.open(res);
      })
  }

  onGetInformation = () => {
    this.service
      .getFullInformation(this.state.company.ЮЛ.ИНН)
      .then((res) => {

        this.setState({
          fullInformation: res
        })
      })
  }

  getCompany = (company) => {

    if (company === this.state.company) {
      return
    }
    this.setState({
      loading: true,
      company: company
    })
  }

  setLoadingFalse = () => {
    this.setState({
      loading: false
    })
  }


  render() {

    const { list, error, loading, Positive, Negative, historyList, fullInformation, company } = this.state;

    return (
      <div className="main">

        <Header />
        <div className="search">
          <div style={{ paddingTop: 30 }} className="search__wrapper">
            <div style={{
              padding: 10
            }}>

              <SearchBlock onSearchCompany={this.searchCompany}
                error={error} />

              <MapBlock list={list}
                onGetCoordinates={this.getCoordinates}
                loading={loading}
                verificatePartner={this.verificatePartner}
                getStatement={this.onGetStatement}
                getInformation={this.onGetInformation}
                company={company}
                setLoadingFalse={this.setLoadingFalse} />

              {company &&
                <div style={{ marginTop: 20 }}>

                  <Button style={{ width: 200 }}
                    type='primary'
                    onClick={this.verificatePartner}>

                    <NavLink to='/check'>
                      Проверить контрагента
                    </NavLink>

                  </Button>

                  <Button style={{
                    width: 200,
                    marginLeft: 15
                  }}
                    type='primary'
                    onClick={this.onGetInformation}>

                    <NavLink to='/full_information'>
                      Полная информация
                    </NavLink>

                  </Button>

                  <Button style={{
                    width: 200,
                    marginLeft: 15
                  }}
                    type='primary'
                    onClick={this.onGetStatement}
                    icon={<DownloadOutlined />} size='large' >

                    Получить выписку
                  </Button>

                </div>
              }
            </div>


            <Route path='/company_list' render={() =>

              <CompanyList list={list}
                onGetCompany={this.getCompany}
                loading={loading} />}
            />
            <Route path='/check' render={() =>

              <CompanyDescription status={company.ЮЛ.Статус}
                positive={Positive}
                negative={Negative} />}
            />
            <Route path='/full_information' render={() =>

              <FullDescription information={fullInformation} />}
            />

            <QueryHistory onSearchCompany={this.searchCompany}
              historyList={historyList} />


          </div>

          {/* <SliderShow /> */}

        </div>

      </div>
    );
  }
}

const AppContainer = withRouter(App);

export default AppContainer;

