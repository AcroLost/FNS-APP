import React from 'react';
import { Divider } from 'antd';

const QueryHistory = ({ historyList, onSearchCompany }) => {


    if (historyList.length === 0) {
        return null;
    }

    const items = historyList.map((item) => {

        return (
            <div style={{
                textAlign: 'left',
                marginLeft: 15
            }}>
                <p style={{
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
                    onClick={() => onSearchCompany(item.name)}>
                    {item.name}
                </p>
                {/* <Divider /> */}
            </div>
        );
    });

    return (
        <div style={{ marginLeft: 35 }}>

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