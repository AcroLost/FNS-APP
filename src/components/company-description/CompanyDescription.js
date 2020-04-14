import React from 'react';

const CompanyDescription = ({ positive, negative }) => {

  return (

    <div style={
      {
        textAlign: 'left',
        width: 300,
        marginLeft: 30,
        background: 'white',
        padding: 10
      }}>

      <div>
        <b style={{ fontSize: 17 }}>Позитивные факторы:</b>
        {positive &&
          Object.keys(positive).map((item) => {

            return <p style={{ marginLeft: 15 }}>
              <b>{item}:</b> {positive[item]}
            </p>

          })
        }
      </div>
      <hr />
      <div style={{ marginTop: 20 }}>

        <b style={{ fontSize: 17 }}>Негативные факторы:</b>
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