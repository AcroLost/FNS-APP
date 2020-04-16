import React from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';

import { DownloadOutlined } from '@ant-design/icons';
import './map-block.css';
import { Spin, Button } from 'antd';
import { NavLink } from 'react-router-dom';

const MapBlock = ({ list, loading, verificatePartner, getStatement, getInformation }, props) => {

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
          {list &&

            list.map((i) => {

              return <Placemark defaultGeometry={[i.point[1], i.point[0]]}
                properties={{
                  balloonContentBody:
                    `<b>Наименование организации:</b> ${i.ЮЛ.НаимПолнЮЛ}<br>
                  <b>ИНН:</b> ${i.ЮЛ.ИНН}<br>
                  <b>ОГРН:</b> ${i.ЮЛ.ОГРН}<br>
                  <b>Адрес:</b> ${i.ЮЛ.АдресПолн}<br>
                  <b>Статус:</b> ${i.ЮЛ.Статус}<br>
                  <b>Вид деятельности:</b> ${i.ЮЛ.ОснВидДеят}`
                }} />
            })
          }

          <GeolocationControl options={{ float: 'left' }} />
        </Map>

      </YMaps >

      {list.INN &&
        <div style={{ marginTop: 20 }}>
          <Button style={{ width: 200 }}
            type='primary'
            onClick={verificatePartner}>
            <NavLink to='/check'>
              Проверить контрагента
              </NavLink>
          </Button>

          <Button style={{
            width: 200,
            marginLeft: 15
          }}
            type='primary'
            onClick={getInformation}>
            <NavLink to='/full_information'>
              Полная информация
            </NavLink>
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

export default MapBlock;