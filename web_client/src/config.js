require('dotenv').config();

//-------------------- 'L': localhost  ;  'D': development  ;  'PP': pre-production  ;  'P': production -----------------------------
const URL_PORT = () => {

    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_ENVIROMENT
    }

    else {
        return '';
    }
}

module.exports = URL_PORT;