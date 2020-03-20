import React, { Component } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from 'react-yandex-maps';
import Service from '../../services/service';

import './map-block.css';
import { Spin } from 'antd';

export default class MapBlock extends Component {

    service = new Service();

    render() {

        const { list, point, loading } = this.props;

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
                                    `company: ${list.FullName}<br>
                   ИНН: ${list.INN}<br>
                   ОГРН: ${list.OGRN}<br>
                   Адрес: ${list.Address}`
                            }} />
                        {console.log(point)}
                        <GeolocationControl options={{ float: 'left' }} />
                    </Map>

                </YMaps >
            </div>
        );
    }
}