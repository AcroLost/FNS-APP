import React from 'react';

import './companyList.scss';
import { Spin } from 'antd';

const CompanyList = ({ list }) => {


  if (!list) {
    return <Spin size="large" />
  }

  return (

    <div className="companyList">

      <div>
        {
          list.map((item) => {

            return <div key={item}>
              <b>{item.ЮЛ.НаимПолнЮЛ}</b>
              <hr />
            </div>;
          })
        }
      </div>

    </div>
  );
}

export default CompanyList;