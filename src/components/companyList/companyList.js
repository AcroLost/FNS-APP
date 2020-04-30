import React from 'react';

import './companyList.scss';
import { Spin } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { useEffect } from 'react';

const CompanyList = ({ history, companyNull, list, onGetCompany, loading }) => {

  useEffect(() => {
    companyNull();

    if (!loading) {
      history.push("/home");
    }
  }, []);

  if (!list.length || loading) {
    return <Spin size="large" />
  }

  return (

    <div className="companyList">
      <h3>Найдено организаций: {list.length}</h3>
      <div style={{ overflowY: 'scroll', height: 610 }}>
        {
          list.map((item) => {

            return <div key={item.ИНН}
              onClick={() => onGetCompany(item)}
              className='company'>

              <NavLink to={`/home/company_list/${item.НаимСокрЮЛ}`}
                activeClassName='company_active' >

                {item.НаимПолнЮЛ || item.ФИОПолн}

              </NavLink>
              <p>
                Статус:
              <span className={
                  item.Статус === "Действующее" ? 'active' : 'unActive'
                }>

                  {item.Статус}
                </span>
              </p>
              <hr />

            </div>
          })
        }
      </div>

    </div>
  );
}

const CompanyListContainer = withRouter(CompanyList)

export default CompanyListContainer;