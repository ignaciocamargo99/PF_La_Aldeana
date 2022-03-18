using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace desktop_employee.src
{
    class config
    {
        //------------ 'L': localhost  ;  'D': development  ;  'PP': pre-production  ;  'P': production ------------
        readonly string enviroment = "L";
        public string getUrlPort()
        {
            string url = "http://localhost:3001";

            if (enviroment == "D")
            {
                return url = "https://la-aldeana-dev.herokuapp.com";
            }
            else if (enviroment == "PP")
            {
                return url = "https://la-aldeana-staging.herokuapp.com";
            }
            else if (enviroment == "P")
            {
                return url = ""; /** APIs SERVER PRODUCTION */
            }
            return url;
        }

        public string getEnviroment()
        {
            return enviroment;
        }
    }
}
