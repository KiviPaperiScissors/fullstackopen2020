require('dotenv').config()

let PORT = process.env.port
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
  TESTTOKEN = process.env.TESTTOKEN
}

if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}
