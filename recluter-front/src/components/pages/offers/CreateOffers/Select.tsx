import React, { useMemo, useRef, useState } from 'react';
import { Select as AntdSelect, Spin } from 'antd';
import debounce from 'lodash/debounce';
import type { SelectProps } from 'antd';

interface CustomSelectProps<ValueType = any> extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  customClassName?: string; // Prop para clases CSS personalizadas adicionales
}

function DebounceSelect<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
  fetchOptions,
  debounceTimeout = 800,
  customClassName,
  ...props
}: CustomSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return; // Evitar orden incorrecto de las llamadas fetch
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <AntdSelect
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      className={`
        w-full 
        border
        border-blue3 
        placeholder:text-green32 
        focus:placeholder:text-grays 
        hover:placeholder:text-black 
        hover:border-2 
        hover:border-gray-600 
        hover:text-black 
        focus:border-4 
        focus:border-[#91c3fd] 
        focus:text-gray-500 
        rounded-[4px] 
        transition-all 
        duration-200 
        text-black 
        font-medium 
        text-body-md 
        ${customClassName} 
      `}
      dropdownClassName="select-dropdown"
      showArrow
      // value={undefined} // Solo si quieres ocultar los valores seleccionados en el `Select`
      {...props}  // Aquí puedes manejar las propiedades adicionales como `onChange`
      options={options}
    />
  );
}

export default DebounceSelect;
