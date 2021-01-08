const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Pedro',
      profession: 'developer',
    };
    expect(queryString(obj)).toBe('name=Pedro&profession=developer');
  });
  it(`should create a valid query string 
  even when an array is passed as value`, () => {
    const obj = {
      name: 'Pedro',
      abilities: ['JS', 'TDD'],
    };
    expect(queryString(obj)).toBe('name=Pedro&abilities=JS,TDD');
  });
  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Pedro',
      abilities: { first: 'JS', second: 'TDD' },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Object to query string', () => {
  it('should covert a query string to object', () => {
    const qs = 'name=Pedro&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Pedro',
      profession: 'developer',
    });
  });
  it('should covert a query string of a single key-value pair to object', () => {
    const qs = 'name=Pedro';
    expect(parse(qs)).toEqual({
      name: 'Pedro',
    });
  });
  it('should covert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Pedro&abilities=JS,TDD';
    expect(parse(qs)).toEqual({
      name: 'Pedro',
      abilities: ['JS', 'TDD'],
    });
  });
});
