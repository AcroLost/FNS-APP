import React from 'react';

import { Spin, Collapse } from 'antd';
import './FullDescription.scss';

const { Panel } = Collapse;

const FullDescription = ({ information }) => {

  return (

    <div className="information">
      {!information

        ? <Spin style={{ margin: '100px auto' }} size="large" />

        : <div className="information__wrapper fullDescription">

          <div>
            <b style={{ fontSize: 17 }}>Полная информация:</b>
            <div style={{ overflowY: 'scroll', height: 575 }}>
              {
                Object.keys(information).map((item) => {

                  if (Array.isArray(information[item])) {

                    information[item].map((i) => {
                      return null
                    })
                  }

                  if (typeof information[item] === 'object') {

                    return <Collapse key={item} style={{ marginLeft: 7 }}>
                      <Panel header={item} key={item}> {Object.keys(information[item]).map((i) => {

                        return (
                          <span key={i}>
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

                  return <div key={item} style={{ marginLeft: 7 }}>
                    <span>
                      <b>{item}:</b> {information[item]}
                    </span>
                    <hr />
                  </div>
                })
              }
            </div>
          </div>

        </div>
      }
    </div>

  );
}

export default FullDescription;