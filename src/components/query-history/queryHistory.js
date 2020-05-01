import React from 'react';

import './queryHistory.scss'

const QueryHistory = ({ historyList, onSearchCompany }) => {


    if (historyList.length === 0) {
        return null;
    }

    const items = historyList.map((item) => {

        return (
            <div className='history__item'>
                <span onClick={() => onSearchCompany(item.name)}>
                    {item.name}
                </span>
                <hr />
            </div>
        );
    });

    return (
        <div style={{
            marginLeft: 15,
            background: 'white',
            padding: '10px 20px',
            height: 615
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