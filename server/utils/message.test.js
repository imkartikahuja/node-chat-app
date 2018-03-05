const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'kartik';
    var text = 'testing function';
    var result = generateMessage(from,text);

    expect(result).toInclude({from,text});
    expect(result.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'kartik';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var result = generateLocationMessage(from,latitude,longitude);

    expect(result).toInclude({from,url});
    expect(result.createdAt).toBeA('number');
  });
});
