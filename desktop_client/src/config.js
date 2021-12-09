const ENVIRONMENT = 'D'

//-------------------- 'L': localhost  ;  'D': development  ;  'PP': pre-production  ;  'P': production -----------------------------

const URL_PORT = () => {

    switch (ENVIRONMENT) {
        case 'L':
            return '';

        case 'D':
            return 'https://la-aldeana-dev.herokuapp.com';

        case 'PP':
            return 'https://la-aldeana-staging.herokuapp.com';

        case 'P':
            return /** APIs SERVER PRODUCTION */;

        default:
            break;
    }
}

module.exports = URL_PORT;