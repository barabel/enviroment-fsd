/**
 * Функция валидации номера телефона
 */
export const handlePhoneValidation = (element: string): boolean => {
  const isValid = /^[+]?[\s0-9]*[(]?[0-9]{1,4}[)]?[-\s0-9]*$/g.test(element);

  return isValid;
}
