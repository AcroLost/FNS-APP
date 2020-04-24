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
import { Route, withRouter } from 'react-router-dom';
import CompanyList from './components/companyList/companyList';

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

    fullInformation: null,

    regions: null
  }

  companyNull = () => {
    this.setState({
      company: null
    })
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

          if (item.hasOwnProperty('ЮЛ')) {

            if (item.ЮЛ.ГдеНайдено === 'ИНН') {

              return this.getCoordinates([item.ЮЛ]);

            } else if (item.ЮЛ.ГдеНайдено === 'ОГРН') {
              return this.getCoordinates([item.ЮЛ]);

            } else if (item.ЮЛ.ГдеНайдено.indexOf('Наименование ЮЛ' || 'ФИО') > -1) {
              return this.getCoordinates([item.ЮЛ]);
            }

          } else if (item.hasOwnProperty('ИП')) {

            return this.getCoordinates([item.ИП]);
          }
        })
      });
  }

  getCoordinates(list) {

    list.map((i) => {

      if (this.state.regions) {

        this.state.regions.map((item) => {

          if (i.АдресПолн.indexOf(item) > -1) {
            this.service
              .getCoord(i.АдресПолн)
              .then((res) => {

                this.setState({

                  list: [...this.state.list, { ...i, point: res.split(' ') }],
                })
              })
          }
        })
        return
      }

      this.service
        .getCoord(i.АдресПолн)

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
      .verificationPartner(this.state.company.ИНН)

      .then((res) => {

        this.setState({
          Positive: res.Positive,
          Negative: res.Negative,
        });
      })
  }

  onGetStatement = () => {
    this.service
      .getStatement(this.state.company.ИНН)
      .then((res) => {
        window.open(res);
      })
  }

  onGetInformation = () => {
    this.service
      .getFullInformation(this.state.company.ИНН)
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

  getRegion = (regions) => {
    this.setState({
      regions: regions
    })
  }

  clearCheckbox = () => {

    this.setState({
      region: null
    })

    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
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
                error={error}
                onClearCheckbox={this.clearCheckbox}
                getRegion={this.getRegion} />

              <MapBlock list={list}
                onGetCoordinates={this.getCoordinates}
                loading={loading}
                verificatePartner={this.verificatePartner}
                getStatement={this.onGetStatement}
                getInformation={this.onGetInformation}
                company={company}
                setLoadingFalse={this.setLoadingFalse} />


            </div>


            <Route exact path='/company_list' render={() =>

              <CompanyList companyNull={this.companyNull}
                list={list}
                onGetCompany={this.getCompany}
                loading={loading} />}
            />
            <Route path={`/company_list/:company/check`} render={() =>

              <CompanyDescription status={company.Статус}
                positive={Positive}
                negative={Negative} />}
            />
            <Route path='/company_list/:company/full_information' render={() =>

              <FullDescription information={fullInformation} />}
            />

            <QueryHistory onSearchCompany={this.searchCompany}
              historyList={historyList} />

          </div>
        </div>
      </div>
    );
  }
}

const AppContainer = withRouter(App);

export default AppContainer;

