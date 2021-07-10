const ENVIRONMENT = 'L'

//-------------------- 'L': localhost  ;  'D': development  ;  'PP': pre-production  ;  'P': production -----------------------------

const URL_PORT = () => {

    switch (ENVIRONMENT) {
        case 'L':
            return 'http://localhost:3001';

        case 'D':
            return /** APIs SERVER DEVELOPMENT */;

        case 'PP':
            return /** APIs SERVER PRE-PRODUCTION */;

        case 'P':
            return /** APIs SERVER PRODUCTION */;

        default:
            break;
    }
}

module.exports = URL_PORT;