const moment = require('moment');

var generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()     //gets timein msec from jan 1st 1970 UTC
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
