using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using desktop_employee.src.views.Employees;
using desktop_employee.src.views.RegisterAssistance;

namespace desktop_employee
{
    public partial class main : Form
    {
        public main()
        {
            InitializeComponent();
        }

        private void btnEmployees_Click(object sender, EventArgs e)
        {
            frmEmployees employees = new();
            employees.ShowDialog();
        }

        private void btnRegisterAssistance_Click(object sender, EventArgs e)
        {
            frmRegisterAssistence registerAssistence = new();
            registerAssistence.ShowDialog();
        }
    }
}
