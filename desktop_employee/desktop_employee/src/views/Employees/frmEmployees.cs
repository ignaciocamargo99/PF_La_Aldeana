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
using desktop_employee.src.views.Employees;

namespace desktop_employee.src.views.Employees
{
    public partial class frmEmployees : Form
    {
        DataTable employeesTable = new DataTable();
        DataTable employeeSelectedTable = new DataTable();
        private Panel pnlPadre;
        public Panel PnlPadre { get => pnlPadre; set => pnlPadre = value; }

        public frmEmployees()
        {
            InitializeComponent();
        }

        private async void frmEmployees_LoadAsync(object sender, EventArgs e)
        {
            List<Employee> listado = new List<Employee>();
            Reply oReply = new Reply();
            oReply = await Consumer.Execute<List<Employee>>("http://localhost:3001/api/employeesDesktop", methodHttp.GET, listado);
            this.dgvEmployees.DataSource = oReply.Data;
            employeesTable = ConvertDgvToTable(dgvEmployees);
            
            foreach (DataGridViewTextBoxColumn column in dgvEmployees.Columns)
            {
                column.Width = 250;
            }

            //validar boton
            btnEditEmployee.Enabled = true;
        }

        private DataTable createTableEmployee()
        {
            DataTable table = new DataTable();
            DataColumn cDni = new DataColumn("dni");
            DataColumn cName = new DataColumn("name");
            DataColumn cLastName = new DataColumn("last_name");
            table.Columns.Add(cDni);
            table.Columns.Add(cName);
            table.Columns.Add(cLastName);

            return table;
        }

        private DataTable ConvertDgvToTable(DataGridView dgv)
        {
            DataTable table = createTableEmployee();

            for (int i = 0; i < dgv.RowCount; i++)
            {
                DataRow row = table.NewRow();
                row["dni"] = dgv.Rows[i].Cells[0].Value;
                row["name"] = dgv.Rows[i].Cells[1].Value;
                row["last_name"] = dgv.Rows[i].Cells[2].Value;
                table.Rows.Add(row);
            }
            return table;
        }

        private DataTable filterEmployee(DataTable table, int dni)
        {
            DataTable newTable = createTableEmployee();

            for (int i = 0; i < table.Rows.Count; i++)
            {
                if (Convert.ToInt32(table.Rows[i][0]) == dni)
                {
                    DataRow row = newTable.NewRow();
                    row["dni"] = table.Rows[i][0];
                    row["name"] = table.Rows[i][1];
                    row["last_name"] = table.Rows[i][2];
                    newTable.Rows.Add(row);
                }
            }
            return newTable;
        }

        private void btnEditEmployee_Click(object sender, EventArgs e)
        {
            int employee_dni = Convert.ToInt32(dgvEmployees.CurrentRow.Cells[0].Value);
            employeeSelectedTable = filterEmployee(employeesTable, employee_dni);

            frmEditEmployee frmEditEmployee = new();
            frmEditEmployee.EmployeeSelected = employeeSelectedTable;
            frmEditEmployee.PnlPadre = pnlPadre;
            OpenForm(frmEditEmployee);
        }

        private void btnAplicarFiltros_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Falta desarrollar los filtros");
        }

        private void OpenForm(Form form)
        {
            if (pnlPadre.Controls.Count > 0)
                pnlPadre.Controls.RemoveAt(0);
            form.TopLevel = false;
            form.Dock = DockStyle.Fill;
            pnlPadre.Controls.Add(form);
            form.Show();
        }
    }
}
