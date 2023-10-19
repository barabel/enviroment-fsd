/**
 * Функция для очистки пустых данных в фильтре
 */
export const clearWasteData = (data: Record<string, any>): Record<string, any> => {
  const values: Record<string, any> = {
    ...data,
  };
  const cleanData: Record<string, any> = {};
  const keys = Object.keys(values);
  keys.forEach((key) => {
    if (Array.isArray(values[key])) {
      if ((values[key][0] === '' || values[key][0] === undefined) && (values[key][1] === '' || values[key][1] === undefined)) {
        return
      }

      cleanData[key] = values[key];
    }

    if (typeof values[key] === 'object' && values[key] !== null) {
      if (values[key].value === '' || !values[key].type) {
        return
      }
      cleanData[key] = values[key]
    }

    if (values[key] === false) {
      cleanData[key] = values[key];
    }

    if (values[key]) {
      cleanData[key] = values[key];
    }
  });

  return cleanData
}
