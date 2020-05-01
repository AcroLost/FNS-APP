import React from 'react';

import './fullDescription.scss';
import { Spin, Collapse } from 'antd';
const { Panel } = Collapse;

const FullDescription = ({ information }) => {

  return (

    <div style={{ width: 420 }}>
      {!information

        ? <Spin style={{ margin: '0 auto' }} size="large" />

        : <div className="fullDescription">

          <div>
            <b style={{ fontSize: 17 }}>Полная информация:</b>
            {
              Object.keys(information).map((item) => {

                if (Array.isArray(information[item])) {

                  information[item].map((i) => {
                    return null
                  })
                }

                if (typeof information[item] === 'object') {

                  return <Collapse style={{ marginLeft: 7 }}>
                    <Panel header={item} key={item}> {Object.keys(information[item]).map((i) => {

                      return (
                        <span>
                          <span>
                            <b>{i}:</b> {information[item][i]}
                          </span>
                          <hr />
                        </span>
                      );
                    })}
                    </Panel>
                  </Collapse>
                }

                return <p style={{ marginLeft: 7 }}>
                  <b>{item}:</b> {information[item]}
                  <hr />
                </p>
              })
            }
          </div>

        </div>
      }
    </div>

  );
}

export default FullDescription;