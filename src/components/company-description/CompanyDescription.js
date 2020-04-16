import React from 'react';
import Chart from '../chart/chart';

import './companyDescription.scss';
import { Spin } from 'antd';

const CompanyDescription = ({ positive, negative, status }) => {


  if (!positive || !negative) {
    return <Spin size="large" />
  }

  const active = status === "Действующее" ? 'active' : 'unActive';

  return (

    <div className="description">

      <div>
        <b style={{ fontSize: 17 }}>Позитивные факторы:</b>
        {positive &&
          Object.keys(positive).map((item) => {

            return <p style={{ marginLeft: 15 }}>
              <b>{item}:</b> {positive[item]}
            </p>

          })
        }
      </div>
      <hr />
      <div style={{ marginTop: 20 }}>

        <b style={{ fontSize: 17 }}>Негативные факторы:</b>
        {negative &&
          Object.keys(negative).map((item) => {

            return <p style={{ marginLeft: 15 }}>
              <b>{item}:</b> {negative[item]}
            </p>;
          })
        }
      </div>
      <hr />
      <p>Статус: <span className={active}>{status}</span></p>

      <Chart positive={positive}
        negative={negative} />
    </div>
  );
}

export default CompanyDescription;