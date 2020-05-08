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
            display: menu
        }}>
            <div style={{ position: "relative" }}>

                <span className="history_close" onClick={toggleMenu}>
                    &times;
                </span>

                <p className="history__title">
                    История запросов
                </p>

                {items}
            </div>
        </div>
    );
}

export default QueryHistory;