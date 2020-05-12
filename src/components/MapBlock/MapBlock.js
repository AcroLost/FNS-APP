import React from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';

import { Spin, Button } from 'antd';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import './MapBlock.scss';

const MapBlock = ({ getStatement, verificatePartner, getInformation, list, loading, company, setLoadingFalse }) => {

  const [zoom, setZoom] = useState(11),
    [center, setCenter] = useState([54.75, 56.00]);

  useEffect(() => {
    if (company) {
      setLoadingFalse();
      setZoom(17);
      setCenter([company.point[1], company.point[0]])
    }
  }, [company]);


  return (

    <div className="map">

      {loading

        ? <Spin size="large" />

        : <YMaps query={{
          ns: 'use-load-option',
          load:
            'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
        }}>

          <Map style={{ width: '100%', height: 560 }}
            defaultState={{
              center: center,
              zoom: zoom,
              controls: ['zoomControl', 'fullscreenControl']
            }}
          >
            {company
              ? <Placemark defaultGeometry={[company.point[1], company.point[0]]}
                properties={{
                  balloonContentBody:
                    `<b>Наименование:</b> ${company.НаимПолнЮЛ || company.ФИОПолн} <hr>
                <b>ИНН:</b> ${company.ИНН}<hr>
                <b>ОГРН:</b> ${company.ОГРН}<hr>
                <b>Адрес:</b> ${company.АдресПолн}<hr>
                <b>Статус:</b> ${company.Статус}<hr>
                <b>Вид деятельности:</b> ${company.ОснВидДеят}`
                }} />
              : list
                ? list.map((i) => {

                  return <Placemark key={i.ИНН} defaultGeometry={[i.point[1], i.point[0]]}
                    properties={{
                      balloonContentBody:
                        `<b>Наименование:</b> ${i.НаимПолнЮЛ || i.ФИОПолн}<hr>
                      <b>ИНН:</b> ${i.ИНН}<hr>
                      <b>ОГРН:</b> ${i.ОГРН}<hr>
                      <b>Адрес:</b> ${i.АдресПолн}<hr>
                      <b>Статус:</b> ${i.Статус}<hr>
                      <b>Вид деятельности:</b> ${i.ОснВидДеят}`
                    }} />
                })
                : null
            }


            <GeolocationControl options={{ float: 'left' }} />
          </Map>

        </YMaps >
      }


      {company &&
        <div className="map__buttons">

          <Button className="map__button"
            type='primary'
            onClick={verificatePartner}>

            <NavLink to={`/home/company_list/${company.НаимСокрЮЛ}/check`}>
              Проверить контрагента
                    </NavLink>

          </Button>

          <Button className="map__button button_margin"
            type='primary'
            onClick={getInformation}>

            <NavLink to={`/home/company_list/${company.НаимСокрЮЛ}/full_information`}>
              Полная информация
                    </NavLink>

          </Button>

          <Button className="map__button button_margin"
            type='primary'
            onClick={getStatement}
            icon={<DownloadOutlined />} size='middle' >

            Получить выписку
                  </Button>

        </div>
      }


    </div>
  );
}

export default MapBlock;