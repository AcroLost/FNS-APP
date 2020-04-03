import React, { Component } from 'react';


import Service from './services/service';
import SearchBlock from './components/search-block/search-block';


import 'antd/dist/antd.css';
import './App.scss';

import MapBlock from './components/map-block';
import Header from './components/header/header';
import QueryHistory from './components/query-history/queryHistory';
import CompanyDescription from './components/company-description/CompanyDescription';
export default class App extends Component {

  service = new Service();

  state = {
    list: {
      INN: null,
      OGRN: null,
      FullName: null,
      Address: null,
      Status: null,
      Activity: null
    },
    point: [0, 0],
    loading: false,

    Positive: null,
    Negative: null,

    historyList: []
  }

  componentDidMount() {

    if (localStorage.getItem('company') !== null) {
      const historyList = JSON.parse(localStorage.getItem('company'));

      this.setState({
        historyList
      });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    
    localStorage.setItem('company', JSON.stringify(this.state.historyList));
    
    if (localStorage.getItem('company') !== null) {

    const historyList = JSON.parse(localStorage.getItem('company'));
    
      if (historyList.length == 6) {
        this.setState((state) =>{
          return {
            historyList: state.historyList.slice(1)
          }
        })
      }
    }
   
  }

  searchCompany = (name) => {

    const newItem = { name }

    this.setState(({ historyList }) => {
      const newList = [
        ...historyList,
        newItem
      ];

      return {
        historyList: newList
      }
    })


    this.setState({
      loading: true,
      Positive: null,
      Negative: null
    });

    this.service
      .getCompany(name)
      .then((list) => {

        this.getCoordinates(list, list.Address);
      });
  }

  getCoordinates(list) {

    this.service
      .getCoord(list.Address)

      .then((res) => {
        this.setState({
          list,
          point: res.split(' '),
          loading: false
        });

        // this.setState({
        //   loading: !this.state.loading
        // });
      });
  }


  verificatePartner = () => {

    this.service
      .verificationPartner(this.state.list.INN)

      .then((res) => {

        this.setState({
          Positive: res.Positive,
          Negative: res.Negative,
        });
        console.log(this.state);
      })
  }

  onGetStatement = () => {
    this.service
      .getStatement(this.state.list.INN)
      .then((res) => {
        window.open(res);
      })
  }


  render() {

    const { list, point, loading, Positive, Negative, historyList } = this.state;

    return (
      <div className="main">

        <Header />
        <div className="search">
          <div style={{ paddingTop: 30 }} className="search__wrapper">
            <div>

              <SearchBlock onSearchCompany={this.searchCompany} />
              <MapBlock list={list}
                point={point}
                onGetCoordinates={this.getCoordinates}
                loading={loading}
                verificatePartner={this.verificatePartner}
                getStatement={this.onGetStatement} />

            </div>
            {Positive && Negative
              ? <CompanyDescription positive={Positive}
                negative={Negative} />

              : null
            }
            <QueryHistory onSearchCompany={this.searchCompany}
              historyList={historyList} />
          </div>
        </div>
      </div>
    );
  }
}

