const chai = require('chai');
const combos = require('combinations');
const { inspect } = require('util');

const { expect } = chai;

function arraysAreEquivilant(array1, array2) {
  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.reduce((acc, val) => acc.concat(val), []).sort();
  const result = ( 
    sortedArray1.length === sortedArray2.length
    && sortedArray1.filter((v,i) => v !== sortedArray2[i]).length === 0
  );
  return result;
}

function arraySum(array) {
  return array.reduce((a,b) => a + b, 0)
}

function getCombinations(array, length) {
  const allCombos = combos(array);
  const result = allCombos
    .filter((c) => c.length < array.length)
    .map((c) => [
      c,
      allCombos.find((f) => arraysAreEquivilant(f.concat(c), array)),
    ])
    .filter((a) => arraySum(a[0]) === arraySum(a[1]));
  return result.length > 0;
};

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}


function getMatchingSums(array, length) {
  if (array.length < 2) {
    return false;
  }
  return getCombinations(array, length);
};

describe('find matching sums', () => {
  it('simple array with matches should return true', () => {
    const result = getMatchingSums([5,2,3]);
    expect(result).to.be.true;
  });
  it('simple array with no matches should return false', () => {
    const result = getMatchingSums([4,5,6]);
    expect(result).to.be.false;
  });
  it('array with duplicates and matches should return true', () => {
    const result = getMatchingSums([1,3,3,4,5] );
    expect(result).to.be.true;
  });
  it('array with negatives and matches should return true', () => {
    const result = getMatchingSums([1,3,3,4,13,-2] );
    expect(result).to.be.true;
  });
  it('long array with matches should return true', () => {
    const result = getMatchingSums([4,8,7,15,20,90,8,4,8,3,3,1,10,-1]);
    expect(result).to.be.true;
  });
  it('simple array without matches should return false', () => {
    const result = getMatchingSums([2,4,5,6] );
    expect(result).to.be.false;
  });
  it('single item array should return false', () => {
    const result = getMatchingSums([2] );
    expect(result).to.be.false;
  });
  it('two item non-matching array should return false', () => {
    const result = getMatchingSums([1,2] );
    expect(result).to.be.false;
  });
  it('two item matching array should return false', () => {
    const result = getMatchingSums([1,1] );
    expect(result).to.be.true;
  });
  it('empty array should return false', () => {
    const result = getMatchingSums([] );
    expect(result).to.be.false;
  });
  it('array with zeros and matches should return true', () => {
    const result = getMatchingSums([1,3,0,3,4,0,5] );
    expect(result).to.be.true;
  });
  it('Check that an array with multi-digit matching groups returns true', () => {
    const result = getMatchingSums([6,6,8,8,3,2,1]);
    expect(result).to.be.true;
  });
});
