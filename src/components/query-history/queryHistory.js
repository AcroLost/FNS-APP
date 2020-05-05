import React from 'react';

import './queryHistory.scss'

const QueryHistory = ({ menu, historyList, onSearchCompany, toggleMenu }) => {

    if (historyList.length === 0) {
        return null;
    }
    let id = 0;
    const items = historyList.map((item) => {
        id++
        return (
            <div key={id} className='history__item'>
                <span onClick={() => onSearchCompany(item.name)}>
                    {item.name}
                </span>
                <hr />
            </div>
        );
    });

    return (
        <div className="history" style={{
            display: menu,
            position: 'absolute',
            top: '106px',
            right: '10px',
            border: '1px solid #74A8DA',
            background: 'white',
            padding: '14px 20px 6px',
            height: 615,
            boxShadow: '-4px 5px 13px 0px #74A8DA'
        }}>
            <div style={{ position: "relative" }}>

                <span onClick={toggleMenu} style={{
                    position: 'absolute', top: '-16px', right: '-11px', fontSize: '18px', cursor: 'pointer'
                }}>&times;</span>

                <p style={{
                    fontSize: 17,
                    fontWeight: 500
                }}>История запросов
            </p>

                {items}
            </div>
        </div>
    );
}

export default QueryHistory;