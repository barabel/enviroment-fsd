import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Range, getTrackBackground } from 'react-range';
import { type FCClass } from '@/shared/types';
import './react-range.scss';

interface TReactRange {
  step?: number
  min?: number
  max?: number
  values?: number[]
  toFixed?: number
  showPercent?: boolean
  percentPart?: number
  priceDimension?: number
  onChange?: Function
  onFinalChange?: Function
  onNewValues?: Function
}

// Цвета полосок ренжа
const rangeColors = {
  one: ['#17171733', '#00963C'],
  two: ['#17171733', '#00963C', '#17171733'],
}

const numFormat = Intl.NumberFormat('ru-RU');

/**
 * Компонент ренжа
 * @param {Object} props - Пропсы
 * @param {string=} props.className - Дополнительные классы
 * @param {number=} props.step - Шаг значений ренжа
 * @param {number=} props.min - Минимальное значение ренжа
 * @param {number=} props.max - Максимальное значение ренжа
 * @param {number[]} [props.values] - Массив текущих значений ренжа, может быть одно или два значения. Два значения означает, что будет два ползунка
 * @param {number} props.toFixed - Количество цифр после запятой у числа, показываемого под селектом, по-умолчанию ноль
 * @param {boolean=} props.showPercent - Флаг, при true показывает в скобках процент от максимального числа
 * @param {number=} props.percentPart - Доля процента, на это число умножается процент
 * @param {number} props.priceDimension - Размерность числа, показываемого под ренжом
 * @param {(any) => void} [props.onChange] - Колбак, вызываемый при любом изменение ренжа
 * @param {(any) => void} [props.onFinalChange] - Колбак, вызываемый, когда все изменения ренжа применились, используется для отправки данных
 * @param {(any) => void} [props.onNewValues] - Колбак, вызываемый, когда изменился пропс values
 */
export const ReactRange: FCClass<TReactRange> = ({
  className,
  step = 1,
  min: initialMin = 0,
  max: initialMax = 100,
  values: initialValues = [10],
  toFixed = 0,
  showPercent = false,
  percentPart = 1,
  priceDimension = 1,
  onChange,
  onFinalChange,
  onNewValues,
}) => {
  const [values, setValues] = useState(initialValues);
  const [max, setMax] = useState(initialMax);
  const [min, setMin] = useState(initialMin);

  useEffect(() => {
    setMax(initialMax);
  }, [initialMax]);

  useEffect(() => {
    setMin(initialMin);
  }, [initialMin]);

  useEffect(() => {
    setValues([...initialValues]);

    if (typeof onNewValues === 'function') {
      onNewValues([...initialValues]);
    }
  }, [...initialValues]);

  const renderNumber = (index: number): JSX.Element => {
    return (
      <div className={cn('react-range__number t4', { 'react-range__number--first': index === 0, 'react-range__number--second': index === 1 })}>
        {numFormat.format(Number((values[index] / priceDimension).toFixed(toFixed)))}{showPercent ? `\xa0(${(values[index] * 100 / max * percentPart).toFixed(0)}%)` : ''}
      </div>
    );
  }

  return (
    <div className={cn('react-range', className)}>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
          setValues(values);

          if (typeof onChange === 'function') {
            onChange(values);
          }
        }}
        onFinalChange={(values) => {
          if (typeof onFinalChange === 'function') {
            onFinalChange(values);
          }
        }}
        renderTrack={({ props, children }) => (
          <>
            {values.length > 0 && (
              renderNumber(0)
            )}
            <div
              className="react-range__track-outer-copy"
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
              }}
            >
              <div
                className="react-range__track-inner-copy"
                style={{
                  background: getTrackBackground({
                    values,
                    colors: values.length <= 1 ? rangeColors.one : rangeColors.two,
                    min,
                    max,
                  }),
                }}
              >
              </div>
            </div>
            <div
              className="react-range__track-outer"
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
              }}
            >
              <div
                className="react-range__track-inner"
                ref={props.ref}
                style={{
                  background: getTrackBackground({
                    values,
                    colors: values.length <= 1 ? rangeColors.one : rangeColors.two,
                    min,
                    max,
                  }),
                }}
              >
                {children}
              </div>
            </div>
            {values.length >= 2 && (
              renderNumber(1)
            )}
          </>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            className={cn('react-range__thumb', { 'react-range__thumb--grabbed': isDragged })}
            {...props}
            style={{
              ...props.style,
            }}
          >
          </div>
        )}
      />
    </div>
  );
}
