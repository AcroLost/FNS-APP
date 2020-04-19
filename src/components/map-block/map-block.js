import React from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';

import './map-block.scss';
import { Spin } from 'antd';
import { useState, useEffect } from 'react';

const MapBlock = ({ list, loading, company, setLoadingFalse }) => {

  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState([54.75, 56.00]);

  useEffect(() => {
    if (company) {
      setLoadingFalse();
      setZoom(17);
      setCenter([company.point[1], company.point[0]])
    }
  }, [company]);


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
            center: center,
            zoom: zoom,
            controls: ['zoomControl', 'fullscreenControl']
          }}
        >
          {company
            ? <Placemark defaultGeometry={[company.point[1], company.point[0]]}
              properties={{
                balloonContentBody:
                  `<b>Наименование организации:</b> ${company.ЮЛ.НаимПолнЮЛ}<br>
              <b>ИНН:</b> ${company.ЮЛ.ИНН}<br>
              <b>ОГРН:</b> ${company.ЮЛ.ОГРН}<br>
              <b>Адрес:</b> ${company.ЮЛ.АдресПолн}<br>
              <b>Статус:</b> ${company.ЮЛ.Статус}<br>
              <b>Вид деятельности:</b> ${company.ЮЛ.ОснВидДеят}`
              }} />
            : list
              ? list.map((i) => {

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
              : null
          }


          <GeolocationControl options={{ float: 'left' }} />
        </Map>

      </YMaps >


    </div>
  );
}

export default MapBlock;