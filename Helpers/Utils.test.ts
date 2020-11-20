import { arrayOfConsequtiveNumbers } from './Utils'

test('arrayOfConsequtiveNumbers', () => {
  expect(arrayOfConsequtiveNumbers(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  expect(arrayOfConsequtiveNumbers(0)).toEqual([])
})
