const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non string values', () => {
    var str = 123456;
    var res = isRealString(str);

    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var str = '             ';
    var res = isRealString(str);

    expect(res).toBe(false);
  });

  it('should allow string with non-space charater', () => {
    var str = ' F R I E N D S';
    var res = isRealString(str);

    expect(res).toBe(true);
  });
});
