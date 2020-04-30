import React, { useState } from 'react';
import { Form, Input, Button, Spin, Alert, Modal } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import './search-block.scss';

import { UnorderedListOutlined } from '@ant-design/icons';

const SearchBlock = ({ loading, getRegion, onSearchCompany, error, onClearCheckbox }) => {

  const [input, setInput] = useState(''),
    [inputFilter, setFilterInput] = useState(''),
    [display, setDisplay] = useState(false),
    [checkboxList, setCheckboxList] = useState([]);

  const inputChange = (event) => {
    setInput(event.target.value)
  }

  const inputFilterChange = (event) => {
    setFilterInput(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault();
    onSearchCompany(input);
    setInput('');
  }

  if (loading) {
    return <Spin size="large" />
  }

  const regions = ['Москва', 'Санкт-Петербург', 'Адыгея', 'Башкортостан', 'Бурятия', 'Алтай', 'Дагестан', 'Ингушетия', 'Кабардино-Балкарская', 'Калмыкия', 'Карачаево-Черкесская', 'Карелия', 'Коми', 'Марий Эл', 'Мордовия', 'Саха', 'Северная Осетия', 'Татарстан', 'Тыва', 'Удмуртская', 'Хакасия', 'Чеченская', 'Чувашская', 'Алтайский', 'Краснодарский', 'Красноярский', 'Приморский', 'Ставропольский', 'Хабаровский', 'Амурская', 'Архангельская', 'Астраханская', 'Белгородская', 'Брянская', 'Владимирская', 'Волгоградская', 'Воронежская', 'Ивановская', 'Иркутская', 'Калининградская', 'Калужская', 'Камчатский', 'Кемеровская', 'Кировская', 'Костромская', 'Курганская', 'Курская', 'Ленинградская', 'Липецкая', 'Магаданская', 'Московская', 'Мурманская', 'Нижегородская', 'Новгородская', 'Новосибирская', 'Омская', 'Оренбургская', 'Орловская', 'Пензенская', 'Пермский', 'Псковская', 'Ростовская', 'Рязанская', 'Самарская', 'Саратовская', 'Сахалинская', 'Свердловская', 'Смоленская', 'Тамбовская', 'Тверская', 'Томская', 'Тульская', 'Тюменская', 'Ульяновская', 'Челябинская', 'Забайкальский', 'Ярославская', 'Еврейская', 'Ханты-Мансийский', 'Чукотский', 'Ямало-Ненецкий', 'Крым', 'Севастополь', 'Байконур'];

  const regionsList = regions.map((region) => {
    return (
      <li style={{ textAlign: 'left', marginLeft: 10 }} key={region}>
        <input id={region} type="checkbox" onClick={(event) => checkboxListChange(event.target.value)} value={region} />

        <label style={{ marginLeft: 3 }} htmlFor={region}>
          {region}
        </label>
        <hr />
      </li>
    );
  });

  const checkboxListChange = (region) => {
    setCheckboxList([...checkboxList, region]);
  }

  const submitRegion = (event) => {
    event.preventDefault();
    getRegion(checkboxList)
    setDisplay(false);
  }

  return (
    <div className="search">

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
        <Button icon={<UnorderedListOutlined />} style={{ marginLeft: 5 }} onClick={() => setDisplay(true)} type="default">Выбрать регионы</Button>
      </Form>


      <Modal className="search__region"
        visible={display}
        onOk={submitRegion}
        onCancel={() => setDisplay(false)}
        footer={[
          <Button onClick={onClearCheckbox} style={{ marginLeft: 10 }} type='primary'>Сбросить</Button>,

          <Button onClick={submitRegion}
            htmlType="submit"
            style={{ marginLeft: 180 }}
            type='primary'>Ок
          </Button>,

          <Button onClick={() => setDisplay(false)} style={{ marginLeft: 5 }} type="default">Отмена</Button>
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
            {regionsList}
          </ul>


          {/* <Button onClick={submitRegion}
            htmlType="submit"
            style={{ marginLeft: 180 }}
            type='primary'>Ок
          </Button>

          <Button onClick={() => setDisplay('none')} style={{ marginLeft: 5 }} type="default">Отмена</Button> */}
        </Form>
      </Modal>
    </div>
  );
}

export default SearchBlock;
