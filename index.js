const cookie = require('cookie');
const escape = require('escape-html');

module.exports = function (req, res, next) {
  res.flash = function (type, text) {
    const message = {
      type: type,
      text: text
    };

    res.cookie('express_cookie_flashes', JSON.stringify(message), { httpOnly: true });
  };

  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (cookies.express_cookie_flashes) {
      const flashMessage = JSON.parse(cookies.express_cookie_flashes);

      const flashMessageEscaped = {
        type: escape(flashMessage.type),
        text: escape(flashMessage.text)
      };

      res.locals.flashMessage = flashMessageEscaped;

      res.clearCookie('express_cookie_flashes');
    }
  }

  next();
};
