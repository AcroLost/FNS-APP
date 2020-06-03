import React, { useEffect } from 'react';

import { NavLink, withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import './CompanyList.scss';
import { useContext } from 'react';
import { Context } from '../../context';

const CompanyList = ({ history }) => {

  const { companyNull, list, loading, getCompany } = useContext(Context);

  useEffect(() => {
    companyNull();

    if (!loading) {
      history.push("/home");
    }
  }, []);

  return (
    <div className="information">
      {loading

        ? <Spin style={{ margin: '0 auto' }} size="large" />

        : <div className="information__wrapper">

          <h3>Найдено организаций: {list.length}</h3>

          <div style={{ overflowY: 'scroll', height: 575 }}>
            {
              list.map((item) => {

                return <div key={item.ИНН}
                  onClick={() => getCompany(item)}
                  className='company'>

                  <NavLink to={`/home/company_list/${item.НаимСокрЮЛ}`}
                    activeClassName='company_active' >

                    {item.НаимПолнЮЛ || item.ФИОПолн}

                  </NavLink><br />
                  <span>{item.АдресПолн}</span>
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
      }

    </div>
  );
}

const CompanyListContainer = withRouter(CompanyList)

export default CompanyListContainer;