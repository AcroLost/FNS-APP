import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import App from './App';
import { withRouter } from 'react-router-dom';

import { apiFNS, apiYandex } from './services/service';
import { message } from 'antd';

const AppContainer = ({ history }) => {

  const [list, setList] = useState([]),
    [company, setCompany] = useState(null),
    [loading, setLoading] = useState(false),
    [Positive, setPositive] = useState(null),
    [Negative, setNegative] = useState(null),
    [historyList, setHistoryList] = useState([]),
    [fullInformation, setFullInformation] = useState(null),
    [regions, setRegions] = useState([]);

  const companyNull = () => {
    setCompany(null)
  }

  useEffect(() => {

    if (localStorage.getItem('company') !== null) {
      const historyList = JSON.parse(localStorage.getItem('company'));

      setHistoryList(historyList);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('company', JSON.stringify(historyList));

    if (localStorage.getItem('company') !== null) {

      const historyList = JSON.parse(localStorage.getItem('company'));

      if (historyList.length === 6) {

        setHistoryList(historyList.slice(1))
      }
    }
  })

  const searchCompany = (name) => {

    history.push('/home/company_list');
    const newItem = { name }

    setList([]);
    setHistoryList(() => {
      return [
        ...historyList, newItem
      ]
    });

    setLoading(true);
    setPositive(null);
    setNegative(null);

    apiFNS.getCompany(name)
      .then((companyList) => {

        if (!companyList.length) {
          setLoadingFalse();
          return message.warning("Извините, по вашему запросу ничего не было найдено");
        } else if (companyList.indexOf('Ошибка') > -1) {
          setLoadingFalse();
          return message.error(companyList);
        }

        companyList.map((item) => {

          if (item.hasOwnProperty('ЮЛ')) {

            if (item.ЮЛ.ГдеНайдено === 'ИНН' || item.ЮЛ.ГдеНайдено === 'ОГРН' || item.ЮЛ.ГдеНайдено.indexOf('Наименование ЮЛ') > -1 || item.ЮЛ.ГдеНайдено.indexOf('ФИО') > -1) {

              return getCoordinatesCompany([item.ЮЛ]);
            }
          } else if (item.hasOwnProperty('ИП')) {

            return getCoordinatesCompany([item.ИП]);
          }
        })
      });
  }

  const getCoordinatesCompany = (companyList) => {

    companyList.map((i) => {

      if (regions.length > 0) {

        regions.map((item) => {

          if (i.АдресПолн.indexOf(item) > -1) {

            apiYandex.getСoordinates(i.АдресПолн)
              .then((res) => {
                setList((prevList) => [
                  ...prevList,
                  { ...i, point: res.split(' ') }
                ]
                );
              })
          }
        })
        return
      }

      apiYandex.getСoordinates(i.АдресПолн)
        .then((res) => {

          setList((prevList) => [
            ...prevList,
            { ...i, point: res.split(' ') }
          ]
          )
        })
    });

    setLoading(false);
  }

  const verificatePartner = () => {


    apiFNS.verificationPartner(company.ИНН)
      .then((res) => {
        setPositive(res.Positive);
        setNegative(res.Negative);
      });

  }

  const onGetStatement = () => {

    apiFNS.getStatement(company.ИНН)
      .then((res) => {
        window.open(res);
      })
  }

  const onGetInformation = () => {

    apiFNS.getFullInformation(company.ИНН)
      .then((res) => {
        setFullInformation(res);
      })
  }

  const getCompany = (companyName) => {

    if (companyName === company) {
      return
    }
    setLoading(true);
    setCompany(companyName);
  }

  const setLoadingFalse = () => {
    setLoading(false);
  }

  const getRegion = (regionsList) => {

    if (!regions.length) {
      setRegions(regionsList);
      return
    }

    const newRegions = [...regions].concat(regionsList);
    setRegions(Array.from(new Set(newRegions)));
  }

  const updateRegions = (id) => {

    setRegions(() => [
      ...regions.slice(0, id),
      ...regions.slice(id + 1)
    ])
  }

  const clearCheckbox = () => {
    setRegions([]);

    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  }

  return <App regions={regions} searchCompany={searchCompany} clearCheckbox={clearCheckbox}
    getRegion={getRegion} getCoordinates={getCoordinatesCompany} list={list} loading={loading}
    verificatePartner={verificatePartner} onGetStatement={onGetStatement} onGetInformation={onGetInformation}
    company={company} setLoadingFalse={setLoadingFalse} getCompany={getCompany} Positive={Positive} Negative={Negative}
    fullInformation={fullInformation} historyList={historyList} companyNull={companyNull} updateRegions={updateRegions} />
}

const AppContainerWithRouter = withRouter(AppContainer);

export default AppContainerWithRouter;