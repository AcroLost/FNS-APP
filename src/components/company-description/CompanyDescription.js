import React from 'react';

const CompanyDescription = ({ positive, negative }) => {

  return (

    <div style={
      {
        textAlign: 'left',
        width: 300,
        marginLeft: 30
      }}>

      <div>
        <b>Позитивные факторы:</b>
        {positive &&
          Object.keys(positive).map((item) => {

            return <p style={{ marginLeft: 15 }}>
              <b>{item}:</b> {positive[item]}
            </p>;
          })
        }
      </div>

      <div style={{ marginTop: 50 }}>

        <b>Негативные факторы:</b>
        {negative &&
          Object.keys(negative).map((item) => {

            return <p style={{ marginLeft: 15 }}>
              <b>{item}:</b> {negative[item]}
            </p>;
          })
        }
      </div>
    </div>
  );
}

export default CompanyDescription;