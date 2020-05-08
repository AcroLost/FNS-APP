import React from 'react';
import { Form, Input, Button, Alert, Modal } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import './SearchBlock.scss';

import { UnorderedListOutlined } from '@ant-design/icons';


const SearchBlock = ({ error, clearCheckbox, submit, submitRegion, inputChange, inputFilterChange, cancelRegion, inputFilter, display, input, setDisplay, visibleRegions }) => {

  return (
    <div>

      <Form className="search__company">
        <Input placeholder="Например: 'угату'"
          value={input}
          onChange={inputChange} />

        <Button type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
          onClick={submit}>

          Поиск
        </Button>

        {error &&
          <Alert style={{ width: 400, margin: '5px auto 0' }}
            message="Ошибка"
            description="Поле не может быть пустым."
            type="error"
            showIcon
          />
        }

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
