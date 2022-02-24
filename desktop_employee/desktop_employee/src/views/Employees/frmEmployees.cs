using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using desktop_employee.src.entities;
using desktop_employee.src.views.Employees;
using Newtonsoft.Json;

namespace desktop_employee.src.views.Employees
{
    public partial class frmEmployees : Form
    {
        dynamic datosEmpleados;
        DataTable employeeSelectedTable = new DataTable();
        private Panel pnlPadre;
        config config = new();
        public Panel PnlPadre { get => pnlPadre; set => pnlPadre = value; }

        public frmEmployees()
        {
            InitializeComponent();
        }

        private void frmEmployees_Load(object sender, EventArgs e)
        {
            var urlGet = config.getUrlPort() + "/api/employeesDesktop";
            var requestGet = (HttpWebRequest)WebRequest.Create(urlGet);
            requestGet.Method = "GET";
            requestGet.ContentType = "application/json";
            requestGet.Accept = "application/json";
            try
            {
                using WebResponse response = requestGet.GetResponse();
                using Stream strReader = response.GetResponseStream();
                if (strReader == null) return;
                using StreamReader objReader = new StreamReader(strReader);
                string responseBody = objReader.ReadToEnd();

                // Do something with responseBody
                datosEmpleados = JsonConvert.DeserializeObject(responseBody);
                this.dgvEmployees.DataSource = datosEmpleados;
            }
            catch (WebException ex)
            {
                // Handle error
            }

            foreach (DataGridViewTextBoxColumn column in dgvEmployees.Columns)
            {
                column.Width = 250;
            }


            //validar boton
            if (datosEmpleados != null && datosEmpleados.Count > 0)
            {
                btnEditEmployee.BackgroundColor = ColorTranslator.FromHtml("#383C77");
                btnEditEmployee.TextColor = Color.White;
            }
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

        private DataTable filterEmployee(dynamic arrayEmpleados, int dni)
        {
            DataTable employeeSelected = createTableEmployee();

            for (int i = 0; i < arrayEmpleados.Count; i++)
            {
                if (Convert.ToInt32(arrayEmpleados[i].DNI) == dni)
                {
                    DataRow row = employeeSelected.NewRow();
                    row["dni"] = arrayEmpleados[i].DNI;
                    row["name"] = arrayEmpleados[i].NOMBRE;
                    row["last_name"] = arrayEmpleados[i].APELLIDO;
                    employeeSelected.Rows.Add(row);
                }
            }

            return employeeSelected;
        }

        private void btnEditEmployee_Click(object sender, EventArgs e)
        {
            if (dgvEmployees.SelectedRows.Count == 1)
            {
                int employee_dni = Convert.ToInt32(dgvEmployees.CurrentRow.Cells[0].Value);
                employeeSelectedTable = filterEmployee(datosEmpleados, employee_dni);

                frmEditEmployee frmEditEmployee = new();
                frmEditEmployee.EmployeeSelected = employeeSelectedTable;
                frmEditEmployee.PnlPadre = pnlPadre;
                OpenForm(frmEditEmployee);
            }
            else
            {
                MessageBox.Show("No se selecciono nungún empleado.");
            }
        }

        private void btnAplicarFiltros_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Falta desarrollar los filtros");
        }


        private void OpenForm(Form form)
        {
            for (int i = 0; i < Application.OpenForms.Count; i++)
            {
                var tag = Application.OpenForms[i].Tag;
                if (tag == "Empl_Main")
                {
                    Application.OpenForms[i].Close();
                    i--;
                }
            }
            if (pnlPadre.Controls.Count > 0)
                pnlPadre.Controls.RemoveAt(0);
            form.TopLevel = false;
            form.Tag = "Empl_Sub";
            form.Dock = DockStyle.Fill;
            pnlPadre.Controls.Add(form);
            form.Show();
        }
    }
}
