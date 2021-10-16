using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using desktop_employee.src.entities;

namespace desktop_employee.src.views.Employees
{
    public partial class frmEditEmployee : Form
    {
        private DataTable employeeSelected;

        public DataTable EmployeeSelected { get => employeeSelected; set => employeeSelected = value; }

        public frmEditEmployee()
        {
            InitializeComponent();
        }

        

        private void frmEditEmployee_Load(object sender, EventArgs e)
        {
            txtDni.Text = Convert.ToString(EmployeeSelected.Rows[0][0]);
            txtNombre.Text = Convert.ToString(EmployeeSelected.Rows[0][1]);
            txtApellido.Text = Convert.ToString(EmployeeSelected.Rows[0][2]);
        }
    }
}
