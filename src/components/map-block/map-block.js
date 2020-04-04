import React, { Component } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';
import Service from '../../services/service';

import { DownloadOutlined } from '@ant-design/icons';
import './map-block.css';
import { Spin, Button } from 'antd';

export default class MapBlock extends Component {

  service = new Service();

  render() {

    const { list, point, loading, verificatePartner, getStatement } = this.props;

    if (loading) {
      return <Spin size="large" />
    }

    return (

      <div className="map">
        <YMaps query={{
          ns: 'use-load-option',
          load:
            'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
        }}>

          <Map style={{ width: 650, height: 500 }}
            defaultState={{
              center: [54.75, 56.00],
              zoom: 11,
              controls: ['zoomControl', 'fullscreenControl']
            }}
          >

            <Placemark defaultGeometry={[point[1], point[0]]}
              properties={{
                balloonContentBody:
                  `<b>Наименование организации:</b> ${list.FullName}<br>
                  <b>ИНН:</b> ${list.INN}<br>
                  <b>ОГРН:</b> ${list.OGRN}<br>
                  <b>Адрес:</b> ${list.Address}<br>
                  <b>Статус:</b> ${list.Status}<br>
                  <b>Вид деятельности:</b> ${list.Activity}`
              }} />

            <GeolocationControl options={{ float: 'left' }} />
          </Map>

        </YMaps >

        {list.INN &&
          <div style={{ marginTop: 20 }}>
            <Button style={{ width: 200 }}
              type='primary'
              onClick={verificatePartner}>Показать задолженности
        </Button>

            <Button style={{
              width: 200,
              marginLeft: 15
            }}
              type='primary'
              onClick={getStatement}
              icon={<DownloadOutlined />} size='large' >Получить выписку
        </Button>
          </div>
        }
      </div>
    );
  }
}