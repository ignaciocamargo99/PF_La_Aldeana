using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace desktop_employee.src.entities
{
    class FingerPrintXEmployee
    {
        public int dniEmployee { get; set; }
        public string name { get; set; }
        public string last_name { get; set; }
        public byte[] finger_print { get; set; }
    }
}
