import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import Select,
{
  components,
  type PlaceholderProps,
  type ControlProps,
  type OptionProps,
  type SingleValueProps,
  type MultiValueProps,
  type DropdownIndicatorProps,
  type ActionMeta, type MenuProps,
} from 'react-select';

import { type FCClass } from '@/shared/types';
import { IconsArray } from '@/shared/enums';
import './react-select.scss';
import SimpleBar from 'simplebar-react';

enum ReactSelectSprites {
  inputCheckmark = IconsArray.inputCheckmark,
  selectDropdown = IconsArray.selectDropdown,
}

export interface TOption {
  value: string
  selected?: boolean
  title?: string
  label?: string
}

export interface TReactSelect {
  options: TOption[]
  isMulti?: boolean
  placeholder?: string
  selectAll?: string
  selectedOption?: string
  onChange?: Function
  sendAll?: boolean
  prefix?: string
  isFixed?: boolean
  isPortalMenu?: boolean
}

const selectStyles = {
  control: () => ({}),
  valueContainer: () => ({}),
  indicatorsContainer: () => ({}),
  dropdownIndicator: () => ({}),
  singleValue: () => ({}),
  menu: () => ({}),
  menuList: () => ({}),
  option: () => ({}),
  multiValue: () => ({}),
  placeholder: () => ({}),
};

const Control = ({ ...props }: ControlProps<TOption>): JSX.Element => {
  return <components.Control className={'t3'} {...props} />;
};

const Placeholder = ({ ...props }: PlaceholderProps<TOption>): JSX.Element => {
  return <components.Placeholder className={'t3'} {...props} />;
};

const Option = ({ ...props }: OptionProps<TOption>): JSX.Element => {
  return <components.Option className={'t3'} {...props} />;
};

const Menu = ({ children, ...props }: MenuProps<TOption>): JSX.Element => {
  return (
    <components.Menu
      {...props}
    >
      <SimpleBar
        style={{ maxHeight: 150 }}
        autoHide={false}
      >
        {children}
      </SimpleBar>
    </components.Menu>
  );
}

const MultiOption = ({ ...props }: OptionProps<TOption> & { value?: string }): JSX.Element => {
  return (
    <components.Option
      className={cn('t3', {
        'react-select__option--is-selected': props.isSelected,
        'react-select__option--hidden': props.value === '<CHOOSED_ALL>',
      })}
      {...props}
    >
      <div className={'react-select__multi-option'}>
        <input
          className="react-select__multi-option-input"
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <div className="react-select__multi-option-checkmark">
          <svg>
            <use href={`/assets/svg/sprite.svg#${ReactSelectSprites.inputCheckmark}`}></use>
          </svg>
        </div>
        <label className="react-select__multi-option-label">{props.label}</label>
      </div>
    </components.Option>
  );
};

const SingleValue = (props: SingleValueProps<TOption>): JSX.Element => {
  return (
    <div className={cn('react-select__single-value t3')}>
      { `${props.selectProps.prefix ? props.selectProps.prefix : ''} `} {props.children}
    </div>
  );
};

const MultiValue = ({ children }: MultiValueProps<TOption>): JSX.Element => {
  return <span className={'react-select__multi-value t3'}>{children}</span>;
};

const MultiValueRemove = (): null => null;

const DropdownIndicator = ({ ...props }: DropdownIndicatorProps<TOption>): JSX.Element => {
  return (
    <components.DropdownIndicator {...props}>
      <svg>
        <use href={`/assets/svg/sprite.svg#${ReactSelectSprites.selectDropdown}`}></use>
      </svg>
    </components.DropdownIndicator>
  );
};

const getSelectedOptions = (selectOptionsData: TOption[], selectAll: boolean): TOption[] => {
  const multiSelectedOptions = selectOptionsData.filter((object) => {
    return object.selected === true;
  });

  // Если изначально ничего не выбрано, и прокинут пропс "Выбрать все", то выбрать все варианты:
  // if (multiSelectedOptions.length === 0 && selectAll) {
  //   multiSelectedOptions = selectOptionsData;
  // }

  return multiSelectedOptions;
}

/**
 * Компонент селекта
 * @param {Object} props - Пропсы
 * @param {string=} props.className - Дополнительные классы
 * @param {Object[]} props.options - Варианты селекта
 * @param {boolean=} props.options.selected - Флаг выбранного вариант селекта в начале. Если в вариантах его нет, то отображается первый вариант.
 * @param {string} props.options.title - Название варианта селекта
 * @param {string} props.options.value - Значение варианта селекта для формы
 * @param {boolean=} props.isMulti - Флаг селекта с мультивыбором.
 * @param {string=} props.placeholder - Плейсхолдер селекта с мултивыбором
 * @param {string=} props.selectAll - Название варианта в мультиселекте, который выделяет все элементы
 * @param {number=} props.selectedOption - Значение выбранного варианта селекта. Если не указан, то отображается первый вариант
 * @param {(any) => void} [props.onChange] - Колбак функция, вызываемая при изменение варианта селекта.
 * @param {boolean=} props.sendAll - Флаг, показывающий, нужно ли отправлять пустой массив или все выбранные варианты, когда выбираешь все варианты
 * @param {string=} props.prefix - Добавляет префикс перед вариантом
 * @param {boolean=} props.isFixed - Делает фиксированное меню
 */
export const ReactSelect: FCClass<TReactSelect> = ({
  className,
  options,
  isMulti,
  placeholder,
  selectAll,
  selectedOption,
  onChange,
  sendAll = true,
  prefix,
  isFixed = false,
  isPortalMenu,
  ...props
}) => {
  let selectOptionsDataMod: TOption[] = [];
  if (Array.isArray(options)) {
    selectOptionsDataMod = options.map((object) => {
      return {
        ...object,
        label: object.title,
      };
    });
  }

  const [selectOptionsData, setSelectOptionsData] = useState(selectOptionsDataMod);

  const multiSelectedOptions = getSelectedOptions(selectOptionsData, Boolean(selectAll));

  const [selected, setSelected] = useState(multiSelectedOptions);
  const valueRef = useRef(selected);
  valueRef.current = selected;

  const selectAllOption: TOption = {
    value: '<SELECT_ALL>',
    label: selectAll,
  };

  const choosedAllOption: TOption = {
    value: '<CHOOSED_ALL>',
    label: 'Все',
  };

  const isSelectAllSelected = (): boolean => {
    return valueRef.current.length === selectOptionsData.length
  };

  const isOptionSelected = (option: TOption): boolean => {
    return valueRef.current.some(({ value }) => value === option.value) || isSelectAllSelected();
  }

  const getOptions = (): TOption[] => {
    return selectAll ? [selectAllOption, ...selectOptionsData] : [choosedAllOption, ...selectOptionsData]
  };

  const getValue = (): TOption[] => {
    return (isSelectAllSelected() && selectAll ? [selectAllOption] : isSelectAllSelected() ? [choosedAllOption] : selected);
  };

  const multiChange = (newValue: TOption[], actionMeta: ActionMeta<TOption>): void => {
    const { action, option, removedValue } = actionMeta;

    let selectOrChoosedOption;
    if (selectAll) {
      selectOrChoosedOption = selectAllOption;
    } else {
      selectOrChoosedOption = choosedAllOption;
    }

    if (action === 'select-option' && option?.value === selectOrChoosedOption.value) {
      setSelected(selectOptionsData);

      if (typeof onChange === 'function') {
        sendAll
          ? onChange(selectOptionsData.map((obj) => obj.value))
          : onChange([]); // Если мы нажали на вариант, который выделяет все варианты, то в форму отправляется пустой массив, чтобы не отправлять данные
      }
    } else if ((action === 'deselect-option' && option?.value === selectOrChoosedOption.value) || (action === 'remove-value' && removedValue.value === selectOrChoosedOption.value)) {
      setSelected([]);

      if (typeof onChange === 'function') {
        onChange([]);
      }
    } else if (actionMeta.action === 'deselect-option' && isSelectAllSelected()) {
      setSelected(selectOptionsData.filter(({ value }) => value !== option?.value));

      if (typeof onChange === 'function') {
        onChange(
          selectOptionsData
            .filter(({ value }) => value !== option?.value)
            .map((obj) => obj.value),
        );
      }
    } else {
      setSelected(newValue || []);

      if (typeof onChange === 'function') {
        sendAll
          ? onChange(newValue.map((obj) => obj.value) || [])
          : onChange(selectOptionsData.length !== newValue.length ? newValue.map((obj) => obj.value) || [] : []); // Если все варианты выбраны, то в данные отправляется пустой массив, чтобы не отправлять их
      }
    }
  };

  const handleChange = (choosedValue: TOption, actionMeta: ActionMeta<TOption>): void => {
    setSelectValue(choosedValue);

    if (typeof onChange === 'function') {
      onChange(choosedValue.value, actionMeta);
    }
  };

  const [selectValue, setSelectValue] = useState(
    selectedOption
      ? selectOptionsData?.find((option) => option.value === selectedOption)
      : selectOptionsData?.find((option) => option.selected),
  );

  useEffect(() => {
    let selectOptionsData: TOption[] = [];
    if (Array.isArray(options)) {
      selectOptionsData = options.map((object) => {
        return {
          ...object,
          label: object.title,
        };
      });
    }

    const multiSelectedOptions = getSelectedOptions(selectOptionsData, Boolean(selectAll));

    setSelectOptionsData(selectOptionsData);
    setSelected(multiSelectedOptions);
    setSelectValue(
      selectedOption
        ? selectOptionsData?.find((option) => option.value === selectedOption)
        : selectOptionsData.find((option) => option.selected),
    );
  }, [options, selectedOption]);

  return (
    <Select
      {...props}
      isMulti={isMulti}
      blurInputOnSelect={false}
      isOptionSelected={isMulti ? isOptionSelected : undefined}
      closeMenuOnSelect={!isMulti}
      menuPosition={isFixed ? 'fixed' : 'absolute'}
      captureMenuScroll={false}
      menuShouldScrollIntoView={false}
      menuPortalTarget={isPortalMenu ? document.body : null}
      // @ts-expect-error Я не понял как библиотеке сказать, что в первом случае используются типы для мультиселекта, а во втором для одиночного. В документации как то круто пишут про дженерик IsMulti, но как его засунуть в onChange не понятно
      onChange={isMulti ? multiChange : handleChange}
      value={isMulti ? getValue() : selectValue ?? undefined}
      options={isMulti ? getOptions() : selectOptionsData}
      placeholder={placeholder}
      prefix={prefix}
      hideSelectedOptions={false}
      className={cn('react-select', className)}
      classNamePrefix="react-select"
      styles={selectStyles}
      isSearchable={false}
      components={{
        IndicatorSeparator: undefined,
        ClearIndicator: undefined,
        Placeholder,
        DropdownIndicator,
        Option: isMulti ? MultiOption : Option,
        MultiValue,
        MultiValueRemove,
        Control,
        SingleValue,
        Menu,
      }}
    />
  );
};
