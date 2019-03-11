const cookie = require('cookie')
const escape = require('escape-html')

module.exports = function (req, res, next) {
  res.flash = function (type, text) {
    const message = {
      type: type,
      text: text
    }

    res.cookie('cookie_flash_message', JSON.stringify(message), { httpOnly: true })
  }

  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie)
    if (cookies.cookie_flash_message) {
      const flashMessage = JSON.parse(cookies.cookie_flash_message)

      const flashMessageEscaped = {
        type: escape(flashMessage.type),
        text: escape(flashMessage.text)
      }

      res.locals.flashMessage = flashMessageEscaped

      res.clearCookie('cookie_flash_message')
    }
  }

  next()
}
