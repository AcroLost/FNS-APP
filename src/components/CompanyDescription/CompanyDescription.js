import React, { useContext } from 'react';
import Chart from '../chart/chart';

import { Spin, Collapse } from 'antd';
import './CompanyDescription.scss';
import { Context } from '../../context';

const { Panel } = Collapse;

const CompanyDescription = ({ status }) => {

  const { Positive, Negative } = useContext(Context)
  const active = status === "Действующее" ? 'active' : 'unActive';

  return (
    <div className="information">
      {!Positive || !Negative

        ? <Spin style={{ margin: '100px auto' }} size="large" />

        : <div style={{ overflowY: 'scroll' }} className="information__wrapper description">

          <div>
            <b style={{ fontSize: 17 }}>Позитивные факторы:</b>
            {Object.keys(Positive).length > 0

              ? Object.keys(Positive).map((item) => {

                if (typeof Positive[item] === 'object') {

                  return <Collapse key={item} style={{ marginLeft: 7 }}>
                    <Panel header={item}>
                      {Object.keys(Positive[item]).map((i) => {

                        return (
                          <span key={i}>
                            <span>
                              <b>{i}:</b> {Positive[item][i]}
                            </span>
                            <hr />
                          </span>
                        );
                      })}
                    </Panel>
                  </Collapse>
                }

                return <p key={item} style={{ marginLeft: 15 }}>
                  <b>{item}:</b> {Positive[item]}
                </p>

              })
              : <p style={{ marginLeft: 15 }}>Позитивные факторы отсутствуют</p>
            }
          </div>
          <hr />
          <div style={{ marginTop: 20 }}>

            <b style={{ fontSize: 17 }}>Негативные факторы:</b>

            {Object.keys(Negative).length > 0
              ? Object.keys(Negative).map((item) => {

                if (typeof Negative[item] === 'object') {

                  return <Collapse key={item} style={{ marginLeft: 7 }}>
                    <Panel header={item}>
                      {Object.keys(Negative[item]).map((i) => {
                        return (
                          <span key={i}>
                            <span>
                              <b>{i}:</b> {Negative[item][i]}
                            </span>
                            <hr />
                          </span>
                        );
                      })}
                    </Panel>
                  </Collapse>
                }

                return <p key={item} style={{ marginLeft: 15 }}>
                  <b>{item}:</b> {Negative[item]}
                </p>;
              })
              : <p style={{ marginLeft: 15 }}>Негативные факторы отсутствуют</p>
            }
          </div>
          <hr />
          <p>Статус: <span className={active}>{status}</span></p>

          <Chart positive={Positive}
            negative={Negative} />
        </div>
      }
    </div>
  );
}

export default CompanyDescription;