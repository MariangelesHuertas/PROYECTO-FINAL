import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

const CheckboxGroup = Checkbox.Group;

interface Option {
  label: string;
  value: string;
  color?: string;
  type?: string;
  size?: string;
}

interface AppProps {
  options: Option[];
  defaultCheckedList?: string[];
}

const App: React.FC<AppProps> = ({ options = [], defaultCheckedList = [] }) => {
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const checkAll = options.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? options.map(option => option.value) : []);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={options.map(option => ({
          label: (
            <span style={{ color: option.color, fontSize: option.size }}>
              {option.label}
            </span>
          ),
          value: option.value,
        }))}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};

export default App;

