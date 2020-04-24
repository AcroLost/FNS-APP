import React from 'react';

import './companyList.scss';
import { Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const CompanyList = ({ companyNull, list, onGetCompany, loading }) => {

  useEffect(() => {
    companyNull();
  }, []);

  if (!list || loading) {
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

              <NavLink to={`/company_list/${item.НаимСокрЮЛ}`}
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

export default CompanyList;