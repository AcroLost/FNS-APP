import React, { useState } from 'react';
import { Form, Input, Button, Spin, Alert, Modal } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import './search-block.scss';

import { UnorderedListOutlined } from '@ant-design/icons';
import { search, checkedRegion } from '../../helpers/helpers';
import { useEffect } from 'react';

const SearchBlock = ({ loading, getRegion, onSearchCompany, error, onClearCheckbox, regionsListState }) => {

  const regionchiki = ['Москва', 'Санкт-Петербург', 'Адыгея', 'Башкортостан', 'Бурятия', 'Алтай', 'Дагестан', 'Ингушетия', 'Кабардино-Балкарская', 'Калмыкия', 'Карачаево-Черкесская', 'Карелия', 'Коми', 'Марий Эл', 'Мордовия', 'Саха', 'Северная Осетия', 'Татарстан', 'Тыва', 'Удмуртская', 'Хакасия', 'Чеченская', 'Чувашская', 'Алтайский', 'Краснодарский', 'Красноярский', 'Приморский', 'Ставропольский', 'Хабаровский', 'Амурская', 'Архангельская', 'Астраханская', 'Белгородская', 'Брянская', 'Владимирская', 'Волгоградская', 'Воронежская', 'Ивановская', 'Иркутская', 'Калининградская', 'Калужская', 'Камчатский', 'Кемеровская', 'Кировская', 'Костромская', 'Курганская', 'Курская', 'Ленинградская', 'Липецкая', 'Магаданская', 'Московская', 'Мурманская', 'Нижегородская', 'Новгородская', 'Новосибирская', 'Омская', 'Оренбургская', 'Орловская', 'Пензенская', 'Пермский', 'Псковская', 'Ростовская', 'Рязанская', 'Самарская', 'Саратовская', 'Сахалинская', 'Свердловская', 'Смоленская', 'Тамбовская', 'Тверская', 'Томская', 'Тульская', 'Тюменская', 'Ульяновская', 'Челябинская', 'Забайкальский', 'Ярославская', 'Еврейская', 'Ханты-Мансийский', 'Чукотский', 'Ямало-Ненецкий', 'Крым', 'Севастополь', 'Байконур'];

  let id = 0;
  const createRegion = (name) => {
    return { id: id++, name: name, checked: false }
  }

  const [input, setInput] = useState(''),
    [inputFilter, setFilterInput] = useState(''),
    [display, setDisplay] = useState(false),
    [checkboxList, setCheckboxList] = useState(regionsListState),
    [regions, setRegions] = useState([]);

  useEffect(() => {

    regionchiki.map((reg) => {
      setRegions((prevRegions) => [
        ...prevRegions,
        createRegion(reg)
      ]);
    })

  }, []);

  const checked = (regId, region) => {

    setCheckboxList([...checkboxList, region])
    setRegions(checkedRegion(regions, regId, true))
  }
  const unChecked = (regId, region) => {

    checkboxList.map((reg) => {

      if (reg === region) {
        const index = checkboxList.findIndex((item) => item === region);

        setCheckboxList(() => [
          ...checkboxList.slice(0, index),
          ...checkboxList.slice(index + 1)
        ]);
      }
    });


    setRegions(checkedRegion(regions, regId, false));
  }

  const cancelRegion = () => {
    if (!checkboxList.length) {
      setDisplay(false);
      return
    }
    setCheckboxList(regionsListState);
    setDisplay(false);


    if (regionsListState.length) {
      regions.map((region) => {

        let check = 0;
        regionsListState.map((reg) => {

          if (region.name === reg) {

            check++;
            setRegions((prevRegions) => [
              ...prevRegions.slice(0, region.id),
              { ...region, checked: true },
              ...prevRegions.slice(region.id + 1),
            ]);

          } else {
            if (check > 0) {
              return
            }
            setRegions((prevRegions) => {

              return [
                ...prevRegions.slice(0, region.id),
                { ...region, checked: false },
                ...prevRegions.slice(region.id + 1),
              ]
            });
          }
        });
      });
    } else {

      const newArr = regions.map((region) => {
        return { ...region, checked: false }
      });

      setRegions(newArr);
    }
  }

  const submitRegion = (event) => {
    event.preventDefault();
    setCheckboxList([]);
    getRegion(checkboxList);
    setDisplay(false);
  }

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

  const clearCheckbox = () => {

    // setDisplay(false);
    onClearCheckbox();
  }

  if (loading) {
    return <Spin size="large" />
  }

  const regionsList = regions.map((region) => {

    return (

      <li style={{ textAlign: 'left', marginLeft: 10 }} key={region.name}>
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
    );
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
