import React from 'react';
import { Form, Input, Button, Modal } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import './SearchBlock.scss';

import { UnorderedListOutlined } from '@ant-design/icons';
import { search } from '../../helpers/helpers';


const SearchBlock = ({ clearCheckbox, submitSearch, submitRegion, inputChange, inputFilterChange, cancelRegion, inputFilter, input, setDisplay, display, regions, checked, unChecked }) => {

  const regionsList = regions.map((region) => {

    return <li key={region.id} style={{ textAlign: 'left', marginLeft: 10 }}>
      {region.checked

        ? <input checked id={region.id}
          type="checkbox"
          onClick={() => unChecked(region.id, region.name)}
          value={region.name} />

        : <input id={region.id}
          type="checkbox"
          onClick={() => checked(region.id, region.name)}
          value={region.name} />
      }

      <label style={{ marginLeft: 3 }} htmlFor={region.id}>
        {region.name}
      </label>
      <hr />
    </li>
  });

  const visibleRegions = search(regionsList, inputFilter);

  return (
    <div>

      <Form className="search__company">
        <Input placeholder="Например: 'угату'"
          value={input}
          onChange={inputChange} />

        <Button type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
          onClick={submitSearch}>

          Поиск
        </Button>


        {document.body.clientWidth <= 450

          ? <Button className="region_btn" icon={<UnorderedListOutlined />} style={{ marginLeft: 5, width: '40px', height: '40px' }} onClick={() => setDisplay(true)} type="default"></Button>

          : <Button className="region_btn" icon={<UnorderedListOutlined />} style={{ marginLeft: 5 }} onClick={() => setDisplay(true)} type="default">Выбрать регионы</Button>
        }

      </Form>

      <Modal className="search__region"
        visible={display}
        onOk={submitRegion}
        onCancel={() => setDisplay(false)}
        footer={[
          <Button onClick={clearCheckbox} style={{ marginLeft: 10 }} type='primary'>Сбросить</Button>,

          <Button onClick={submitRegion}
            htmlType="submit"
            style={{ marginLeft: 180 }}
            type='primary'>Ок
          </Button>,

          <Button onClick={cancelRegion} style={{ marginLeft: 5 }} type="default">Отмена</Button>
        ]} >

        <h3>Выбрать регионы</h3>
        <Form>

          <Input style={{
            width: '100%', margin: '0 auto 5px', textAlign: 'center'
          }}
            placeholder="Введите регион"
            onChange={inputFilterChange}
            value={inputFilter} />

          <ul>
            {visibleRegions}
          </ul>

        </Form>
      </Modal>
    </div>
  );
}

export default SearchBlock;
