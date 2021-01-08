import { sum } from './calculator';

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it(`should sum 2 and 2 even 
    if on of then is a string and the 
    result must be 4`, () => {
  expect(sum('2', '2')).toBe(4);
});

it(`should throw an erro if what is provided
    to the method cannot be summed`, () => {
  expect(() => {
    sum('', '2');
  }).toThrowError();

  expect(() => {
    sum([2, 2]);
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();
});
