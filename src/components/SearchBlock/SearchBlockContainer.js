import React, { useState } from 'react';

import { checkedRegion } from '../../helpers/helpers';
import { useEffect } from 'react';
import SearchBlock from './SearchBlock';
import { message } from 'antd';
import './SearchBlock.scss';

const SearchBlockContainer = ({ getRegion, onSearchCompany, onClearCheckbox, regionsListState, updateRegions }) => {

    const regionsOfRussia = ['Москва', 'Санкт-Петербург', 'Адыгея', 'Башкортостан', 'Бурятия', 'Алтай', 'Дагестан', 'Ингушетия', 'Кабардино-Балкарская', 'Калмыкия', 'Карачаево-Черкесская', 'Карелия', 'Коми', 'Марий Эл', 'Мордовия', 'Саха', 'Северная Осетия', 'Татарстан', 'Тыва', 'Удмуртская', 'Хакасия', 'Чеченская', 'Чувашская', 'Алтайский', 'Краснодарский', 'Красноярский', 'Приморский', 'Ставропольский', 'Хабаровский', 'Амурская', 'Архангельская', 'Астраханская', 'Белгородская', 'Брянская', 'Владимирская', 'Волгоградская', 'Воронежская', 'Ивановская', 'Иркутская', 'Калининградская', 'Калужская', 'Камчатский', 'Кемеровская', 'Кировская', 'Костромская', 'Курганская', 'Курская', 'Ленинградская', 'Липецкая', 'Магаданская', 'Московская', 'Мурманская', 'Нижегородская', 'Новгородская', 'Новосибирская', 'Омская', 'Оренбургская', 'Орловская', 'Пензенская', 'Пермский', 'Псковская', 'Ростовская', 'Рязанская', 'Самарская', 'Саратовская', 'Сахалинская', 'Свердловская', 'Смоленская', 'Тамбовская', 'Тверская', 'Томская', 'Тульская', 'Тюменская', 'Ульяновская', 'Челябинская', 'Забайкальский', 'Ярославская', 'Еврейская', 'Ханты-Мансийский', 'Чукотский', 'Ямало-Ненецкий', 'Крым', 'Севастополь', 'Байконур'];

    let id = 1;
    const createRegion = (name) => {
        return { id: id++, name: name, checked: false }
    }

    const [input, setInput] = useState(''),
        [inputFilter, setFilterInput] = useState(''),
        [display, setDisplay] = useState(false),
        [checkboxList, setCheckboxList] = useState(regionsListState),
        [regions, setRegions] = useState([]);

    useEffect(() => {

        regionsOfRussia.map((reg) => {
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

                updateRegions(index);
            }
        });


        setRegions(checkedRegion(regions, regId, false));
    }

    const cancelRegion = () => {

        if (!checkboxList.length) {
            return setDisplay(false);
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
        getRegion(checkboxList);
        setDisplay(false);
    }

    const inputChange = (event) => {
        setInput(event.target.value)
    }

    const inputFilterChange = (event) => {
        setFilterInput(event.target.value)
    }

    const submitSearch = (event) => {
        event.preventDefault();
        if (!input.trim()) {
            return message.error("Извините, поле не может быть пустым");
        }
        onSearchCompany(input);
        setInput('');
    }

    const clearCheckbox = () => {

        onClearCheckbox();

        if (checkboxList.length) {

            setRegions([]);
            setCheckboxList([]);

            regionsOfRussia.map((reg) => {
                setRegions((prevRegions) => [
                    ...prevRegions,
                    createRegion(reg)
                ]);
            })
        }
    }



    return (
        <SearchBlock clearCheckbox={clearCheckbox} submitSearch={submitSearch}
            inputFilterChange={inputFilterChange} inputChange={inputChange}
            submitRegion={submitRegion} cancelRegion={cancelRegion}
            checked={checked} unChecked={unChecked}
            inputFilter={inputFilter} display={display} regions={regions}
            input={input} setDisplay={setDisplay} />
    );
}

export default SearchBlockContainer;
