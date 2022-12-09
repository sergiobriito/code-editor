require('dotenv').config()

module.exports = {
    env: {
        REACT_APP_RAPID_API_HOST: process.env.REACT_APP_RAPID_API_HOST,
        REACT_APP_RAPID_API_KEY: process.env.REACT_APP_RAPID_API_KEY,
        REACT_APP_RAPID_API_URL: process.env.REACT_APP_RAPID_API_URL
    }
}