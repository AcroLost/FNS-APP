import React, { useContext } from 'react';

import './QueryHistory.scss'
import { Context } from '../../context';

const QueryHistory = ({ menu, toggleMenu }) => {

    const { searchCompany, historyList } = useContext(Context);

    let id = 0;
    const items = historyList.map((item) => {
        id++
        return (
            <p key={id} className='history__item'>
                <span onClick={() => searchCompany(item.name)}>
                    {item.name}
                </span>
                <hr />
            </p>
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
                {historyList.length
                    ? items
                    : <>
                        <p>История отсутствует</p>
                        <hr />
                    </>
                }
            </div>
        </div>
    );
}

export default QueryHistory;