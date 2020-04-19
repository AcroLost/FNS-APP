import React, { useState } from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';

import { SearchOutlined } from '@ant-design/icons'
import './search-block.scss';

const SearchBlock = ({ loading, onSearchCompany, error }) => {

  const [input, setInput] = useState('');

  const inputChange = (event) => {
    setInput(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault();

    onSearchCompany(input);
    setInput('');

  }

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <div className="search">

      <Form>
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
      </Form>
    </div>
  );
}

export default SearchBlock;
