import React from 'react';

import './queryHistory.scss'

const QueryHistory = ({ historyList, onSearchCompany }) => {


    if (historyList.length === 0) {
        return null;
    }

    const items = historyList.map((item) => {

        return (
            <div className='history__item' style={{
                textAlign: 'center'
            }}>
                <span style={{
                    cursor: 'pointer'
                }}
                    onClick={() => onSearchCompany(item.name)}>
                    {item.name}
                </span>
                <hr />
            </div>
        );
    });

    return (
        <div style={{
            marginLeft: 35,
            background: 'white',
            padding: '10px 20px'
        }}>

            <p style={{
                fontSize: 17,
                fontWeight: 500
            }}>История запросов
            </p>

            {items}
        </div>
    );
}

export default QueryHistory;