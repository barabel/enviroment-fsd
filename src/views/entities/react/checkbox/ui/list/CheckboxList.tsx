import { type FCClass } from '@/shared/types';
import { Checkbox, type ICheckbox } from '@/entities/react/checkbox/ui/item/Checkbox';
import { type Control, Controller, type FieldValues } from 'react-hook-form';
import cn from 'classnames';
import './CheckboxList.scss';
import { useEffect, useMemo, useState } from 'react';

export interface ICheckboxList {
  control?: Control<FieldValues>
  name: string
  isCheckedAll?: boolean
  items: ICheckbox[]
  filterMethods: {
    submit: () => void
  }
}

export const CheckboxList: FCClass<ICheckboxList> = (props) => {
  const {
    className,
    control,
    name,
    items,
    filterMethods,
    isCheckedAll,
  } = props;

  const isAllCheckboxGroup = useMemo(() => items.some((item) => item.value === 'all'), [items]);
  const [checkedAll, setCheckedAll] = useState(isCheckedAll);

  useEffect(() => {
    items.forEach((el) => {
      if (el.value === 'all') {
        el.isSelected ? setCheckedAll(el.isSelected) : setCheckedAll(false)
      }
    })
  }, [])

  useEffect(() => {
    if (isCheckedAll !== undefined) {
      setCheckedAll(isCheckedAll);
    }
  }, [isCheckedAll])

  const changeCheckboxAll = (resultValue: string[], currValue: string, onChange: (...event: any[]) => void): void => {
    onChange([
      ...resultValue,
      currValue,
    ]);

    if ([...resultValue, currValue].length === items.length - 1) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }

  return (
    <div className={cn('checkboxList', className)}>
      {Array.isArray(items) && (
        <Controller
          shouldUnregister={true}
          control={control}
          name={name}
          defaultValue={items?.filter(checkbox => checkbox.isSelected && checkbox.value !== 'all').map(filterCheckbox => filterCheckbox.value)}
          render={({ field: { onChange, value } }) => {
            return (
              <div className={'checkboxList__checkboxes'}>
                {items.map((checkbox, index) => {
                  return (
                    <Checkbox
                      {...checkbox}
                      key={index}
                      className={'checkboxList__checkbox'}
                      name={name}
                      value={checkbox.value}
                      isSelected={checkedAll || value?.some((existingValue: string) => existingValue === checkbox.value)} // eslint-disable-line
                      onChange={(event, checked) => {
                        if (checked) {
                          if (event.target.value === 'all') {
                            setCheckedAll(true);
                            onChange([]);
                          } else {
                            if (isAllCheckboxGroup) {
                              const resultValue = value.filter((el: string) => el !== 'all');
                              changeCheckboxAll(resultValue, event.target.value, onChange);
                            } else {
                              setCheckedAll(false);
                              onChange([
                                ...value,
                                event.target.value,
                              ])
                            }
                          }
                        } else {
                          onChange(value.filter((value: string) => value !== event.target.value));

                          if (isAllCheckboxGroup) {
                            if (event.target.value === 'all') {
                              onChange([]);
                              setCheckedAll(false);
                            } else if (checkedAll) {
                              setCheckedAll(false);
                              onChange(items.filter((item) => item.value !== event.target.value && item.value !== 'all').map(el => el.value));
                            }
                          }
                        }

                        if (filterMethods.submit) {
                          filterMethods.submit();
                        }
                      }}
                    />
                  );
                })}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};
