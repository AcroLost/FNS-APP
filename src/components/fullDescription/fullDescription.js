import React from 'react';

import { Spin, Collapse } from 'antd';
import './FullDescription.scss';
import { useContext } from 'react';
import { Context } from '../../context';

const { Panel } = Collapse;

const FullDescription = () => {

  const { fullInformation } = useContext(Context);
  return (

    <div className="information">
      {!fullInformation

        ? <Spin style={{ margin: '100px auto' }} size="large" />

        : <div className="information__wrapper fullDescription">

          <div>
            <b style={{ fontSize: 17 }}>Полная информация:</b>
            <div style={{ overflowY: 'scroll', height: 575 }}>
              {
                Object.keys(fullInformation).map((item) => {

                  if (Array.isArray(fullInformation[item])) {

                    fullInformation[item].map((i) => {
                      return null
                    })
                  }

                  if (typeof fullInformation[item] === 'object') {

                    return <Collapse key={item} style={{ marginLeft: 7 }}>
                      <Panel header={item} key={item}> {Object.keys(fullInformation[item]).map((i) => {

                        return (
                          <span key={i}>
                            <span>
                              <b>{i}:</b> {fullInformation[item][i]}
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
                      <b>{item}:</b> {fullInformation[item]}
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