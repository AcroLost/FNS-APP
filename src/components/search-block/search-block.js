import React, { Component } from 'react';
import { Form, Input, Button, Spin } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import './search-block.css';

export default class SearchBlock extends Component {

    state = {
        inputValue: ''
    }

    inputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    submit = (event) => {
        event.preventDefault();

        if (!this.state.inputValue) {
            alert('Поле не может быть пустым');
            return;
        }

        this.props.onSearchCompany(this.state.inputValue);

        this.setState({
            inputValue: ''
        });
    }

    render() {

        const { loading } = this.props;

        if (loading) {

            return <Spin size="large" />
        }

        return (
            <div className="search">
                <Form>
                    <Input placeholder="Введите Ваш запрос"
                        value={this.state.inputValue}
                        onChange={this.inputChange} />

                    <Button type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                        onClick={this.submit}>

                        Поиск
                </Button>
                </Form>
            </div>
        );
    }
}