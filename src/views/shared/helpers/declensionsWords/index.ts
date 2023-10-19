/*
 * Функция для склонения слова, в зависимости от значения
 * number - ожидает тип: число
 * words - ожидает тип: массив
*/
export function declensionsWords(number: number, words: string[]): string {
  return words[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : [2, 0, 1, 1, 1, 2][(number % 10 < 5)
        ? number % 10
        : 5]];
}
