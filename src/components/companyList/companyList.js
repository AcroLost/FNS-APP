import React from 'react';

import './companyList.scss';
import { Spin } from 'antd';
import { NavLink } from 'react-router-dom';

const CompanyList = ({ list, onGetCompany, loading }) => {

  if (!list || loading) {
    return <Spin size="large" />
  }

  return (

    <div className="companyList">

      <div>
        {
          list.map((item) => {

            return <div key={item.ЮЛ.ИНН}
              onClick={() => onGetCompany(item)}
              className='company'>

              <NavLink to={`/company_list/${item.ЮЛ.НаимСокрЮЛ}`}
                activeClassName='company_active' >

                {item.ЮЛ.НаимПолнЮЛ}

              </NavLink>
              <p>
                Статус:
              <span className={
                  item.ЮЛ.Статус === "Действующее" ? 'active' : 'unActive'
                }>

                  {item.ЮЛ.Статус}
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