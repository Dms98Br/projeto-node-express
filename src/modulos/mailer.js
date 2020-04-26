const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const {host, port, user, pass} = require('../config/mail.json')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

  transport.use('compile', hbs({
    viewEngine: {
        extName: undefined,
        partialsDir: 'some/path',
        layoutsDir: 'some/path',
        defaultLayout: undefined,
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html'
  }))

  module.exports = transport;
  