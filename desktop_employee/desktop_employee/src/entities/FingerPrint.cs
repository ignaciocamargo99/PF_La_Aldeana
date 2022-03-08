using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace desktop_employee.src.entities
{
    class FingerPrint
    {
        public int dni { get; set; }
        public string finger { get; set; }
        public byte[] fingerPrint { get; set; }
    }
}
