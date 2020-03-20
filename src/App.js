import React, { Component } from 'react';


import Service from './services/service';
import SearchBlock from './components/search-block/search-block';


import 'antd/dist/antd.css';
import './App.css';

import MapBlock from './components/map-block';
import { Spin } from 'antd';
import Header from './components/header/header';
export default class App extends Component {

  service = new Service();

  state = {
    list: {
      INN: '',
      OGRN: '',
      FullName: '',
      Address: ''
    },
    point: [0, 0],
    loading: false
  }

  searchCompany = (name) => {

    this.setState({
      loading: !this.state.loading
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
          point: res.split(' ')
        });

        this.setState({
          loading: !this.state.loading
        });
      });
  }



  render() {

    const { list, point, loading } = this.state;

    return (
      <div className="main">

        <Header />
        <div className="search">
          <div className="search__wrapper">
            <SearchBlock onSearchCompany={this.searchCompany} />
            <MapBlock list={list}
              point={point}
              onGetCoordinates={this.getCoordinates}
              loading={loading} />
          </div>
        </div>
      </div>
    );
  }
}

