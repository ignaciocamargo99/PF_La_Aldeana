using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace desktop_employee.src
{
    class config
    {
        public string getUrlPort()
        {
            //------------ 'L': localhost  ;  'D': development  ;  'PP': pre-production  ;  'P': production ------------
            string var = "D";

            string url = "http://localhost:3001";

            if (var == "D")
            {
                return url = "https://la-aldeana-dev.herokuapp.com";
            }
            else if (var == "PP")
            {
                return url = "https://la-aldeana-staging.herokuapp.com";
            }
            else if (var == "P")
            {
                return url = ""; /** APIs SERVER PRODUCTION */
            }
            return url;
        }
    }
}
