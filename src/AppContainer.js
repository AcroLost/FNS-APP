import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import App from './App';
import { withRouter } from 'react-router-dom';

import { apiFNS, apiYandex } from './services/service';

const AppContainer = ({ history }) => {

  const [list, setList] = useState([]),
    [company, setCompany] = useState(null),
    [error, setError] = useState(false),
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

    if (!name) {
      setError(true)
      return
    } else {
      setError(false)
    }

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

        companyList.map((item) => {

          if (item.hasOwnProperty('ЮЛ')) {

            if (item.ЮЛ.ГдеНайдено === 'ИНН') {

              return getCoordinatesCompany([item.ЮЛ]);

            } else if (item.ЮЛ.ГдеНайдено === 'ОГРН') {
              return getCoordinatesCompany([item.ЮЛ]);

            } else if (item.ЮЛ.ГдеНайдено.indexOf('Наименование ЮЛ' || 'ФИО') > -1) {
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

    regions.map((region) => {
      debugger;
      regionsList.map((reg) => {
        debugger;
        if (region !== reg) {
          setRegions([...regions].concat(regionsList));
        }
      })
    })
  }

  const clearCheckbox = () => {
    setRegions([]);

    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  }

  return <App regions={regions} error={error} searchCompany={searchCompany} clearCheckbox={clearCheckbox}
    getRegion={getRegion} getCoordinates={getCoordinatesCompany} list={list} loading={loading}
    verificatePartner={verificatePartner} onGetStatement={onGetStatement} onGetInformation={onGetInformation}
    company={company} setLoadingFalse={setLoadingFalse} getCompany={getCompany} Positive={Positive} Negative={Negative}
    fullInformation={fullInformation} historyList={historyList} companyNull={companyNull} />
}

const AppContainerWithRouter = withRouter(AppContainer);

export default AppContainerWithRouter;