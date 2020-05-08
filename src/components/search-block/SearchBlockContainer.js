import React, { useState } from 'react';

import './SearchBlock.scss';
import { checkedRegion, search } from '../../helpers/helpers';
import { useEffect } from 'react';
import SearchBlock from './SearchBlock';

const SearchBlockContainer = ({ getRegion, onSearchCompany, error, onClearCheckbox, regionsListState, updateRegions }) => {

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

                updateRegions(index);
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

        onClearCheckbox();

        if (checkboxList.length) {

            setRegions([]);
            setCheckboxList([]);

            regionchiki.map((reg) => {
                setRegions((prevRegions) => [
                    ...prevRegions,
                    createRegion(reg)
                ]);
            })
        }
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
        <SearchBlock clearCheckbox={clearCheckbox} submit={submit}
            inputFilterChange={inputFilterChange} inputChange={inputChange}
            submitRegion={submitRegion} cancelRegion={cancelRegion}
            checked={checked} unChecked={unChecked}
            error={error} inputFilter={inputFilter} display={display} regions={regions} input={input} setDisplay={setDisplay} visibleRegions={visibleRegions} />
    );
}

export default SearchBlockContainer;
