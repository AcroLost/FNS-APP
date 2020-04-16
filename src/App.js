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

        this.getCoordinates(list);
      });
  }

  getCoordinates(list) {


    list.map((i) => {
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
      .verificationPartner(this.state.list.INN)

      .then((res) => {

        this.setState({
          Positive: res.Positive,
          Negative: res.Negative,
        });
      })
  }

  onGetStatement = () => {
    this.service
      .getStatement(this.state.list.INN)
      .then((res) => {
        window.open(res);
      })
  }

  onGetInformation = () => {
    this.service
      .getFullInformation(this.state.list.INN)
      .then((res) => {

        this.setState({
          fullInformation: res
        })
      })
  }


  render() {

    const { list, loading, Positive, Negative, historyList, fullInformation } = this.state;

    return (
      <div className="main">

        <Header />
        <div className="search">
          <div style={{ paddingTop: 30 }} className="search__wrapper">
            <div style={{
              padding: 10
            }}>

              <SearchBlock onSearchCompany={this.searchCompany} />
              <MapBlock list={list}
                onGetCoordinates={this.getCoordinates}
                loading={loading}
                verificatePartner={this.verificatePartner}
                getStatement={this.onGetStatement}
                getInformation={this.onGetInformation} />

            </div>

            <Route path='/check' render={() =>

              <CompanyDescription status={list.Status}
                positive={Positive}
                negative={Negative} />}
            />
            <Route path='/full_information' render={() =>

              <FullDescription information={fullInformation} />}
            />

            <Route path='/company_list' render={() =>

              <CompanyList list={list} />}
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

