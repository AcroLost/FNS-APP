import React from 'react';
import Chart from '../chart/chart';

import { Spin, Collapse } from 'antd';
import './CompanyDescription.scss';

const { Panel } = Collapse;

const CompanyDescription = ({ positive, negative, status }) => {

  const active = status === "Действующее" ? 'active' : 'unActive';

  return (
    <div className="information">
      {!positive || !negative

        ? <Spin style={{ margin: '100px auto' }} size="large" />

        : <div style={{ overflowY: 'scroll' }} className="information__wrapper description">

          <div>
            <b style={{ fontSize: 17 }}>Позитивные факторы:</b>
            {Object.keys(positive).length > 0

              ? Object.keys(positive).map((item) => {

                if (typeof positive[item] === 'object') {

                  return <Collapse key={item} style={{ marginLeft: 7 }}>
                    <Panel header={item}>
                      {Object.keys(positive[item]).map((i) => {

                        return (
                          <span key={i}>
                            <span>
                              <b>{i}:</b> {positive[item][i]}
                            </span>
                            <hr />
                          </span>
                        );
                      })}
                    </Panel>
                  </Collapse>
                }

                return <p key={item} style={{ marginLeft: 15 }}>
                  <b>{item}:</b> {positive[item]}
                </p>

              })
              : <p style={{ marginLeft: 15 }}>Позитивные факторы отсутствуют</p>
            }
          </div>
          <hr />
          <div style={{ marginTop: 20 }}>

            <b style={{ fontSize: 17 }}>Негативные факторы:</b>

            {Object.keys(negative).length > 0
              ? Object.keys(negative).map((item) => {

                if (typeof negative[item] === 'object') {

                  return <Collapse key={item} style={{ marginLeft: 7 }}>
                    <Panel header={item}>
                      {Object.keys(negative[item]).map((i) => {
                        return (
                          <span key={i}>
                            <span>
                              <b>{i}:</b> {negative[item][i]}
                            </span>
                            <hr />
                          </span>
                        );
                      })}
                    </Panel>
                  </Collapse>
                }

                return <p key={item} style={{ marginLeft: 15 }}>
                  <b>{item}:</b> {negative[item]}
                </p>;
              })
              : <p style={{ marginLeft: 15 }}>Негативные факторы отсутствуют</p>
            }
          </div>
          <hr />
          <p>Статус: <span className={active}>{status}</span></p>

          <Chart positive={positive}
            negative={negative} />
        </div>
      }
    </div>
  );
}

export default CompanyDescription;