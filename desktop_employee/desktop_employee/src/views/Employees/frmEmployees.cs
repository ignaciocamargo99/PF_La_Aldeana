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
        DataTable employeeFilteredTable = new DataTable();

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
                btnEditEmployee.Enabled = true;
            }
        }

        private DataTable createTableEmployee()
        {
            DataTable table = new DataTable();
            DataColumn cDni = new DataColumn("DNI");
            DataColumn cName = new DataColumn("NOMBRE");
            DataColumn cLastName = new DataColumn("APELLIDO");
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
                    row["DNI"] = arrayEmpleados[i].DNI;
                    row["NOMBRE"] = arrayEmpleados[i].NOMBRE;
                    row["APELLIDO"] = arrayEmpleados[i].APELLIDO;
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

        private void btnAplicarFiltros_Click(object sender, EventArgs e)
        {
            if (txtNombre.Text != "" || txtApellido.Text != "" || txtDNI.Text != "")
            {
                employeeFilteredTable = createTableEmployee();

                if (txtNombre.Text != "")
                {
                    var nombreIngresado = txtNombre.Text.ToUpper();
                    for (int i = 0; i < datosEmpleados.Count; i++)
                    {
                        var nombreEmpleado = Convert.ToString((datosEmpleados[i].NOMBRE)).ToUpper();
                        if (nombreEmpleado.Contains(nombreIngresado))
                        {
                            DataRow row = employeeFilteredTable.NewRow();
                            row["DNI"] = datosEmpleados[i].DNI;
                            row["NOMBRE"] = datosEmpleados[i].NOMBRE;
                            row["APELLIDO"] = datosEmpleados[i].APELLIDO;
                            employeeFilteredTable.Rows.Add(row);
                        }
                    }
                }

                if (txtApellido.Text != "")
                {
                    var apellidoIngresado = txtApellido.Text.ToUpper();
                    for (int i = 0; i < datosEmpleados.Count; i++)
                    {
                        var apellidoEmpleado = Convert.ToString((datosEmpleados[i].APELLIDO)).ToUpper();
                        if (apellidoEmpleado.Contains(apellidoIngresado))
                        {
                            DataRow row = employeeFilteredTable.NewRow();
                            row["DNI"] = datosEmpleados[i].DNI;
                            row["NOMBRE"] = datosEmpleados[i].NOMBRE;
                            row["APELLIDO"] = datosEmpleados[i].APELLIDO;
                            employeeFilteredTable.Rows.Add(row);
                        }
                    }
                }

                if (txtDNI.Text != "")
                {
                    var dniIngresado = txtDNI.Text;
                    for (int i = 0; i < datosEmpleados.Count; i++)
                    {
                        var dniEmpleado = Convert.ToString((datosEmpleados[i].DNI));
                        if (dniEmpleado.Contains(dniIngresado))
                        {
                            DataRow row = employeeFilteredTable.NewRow();
                            row["DNI"] = datosEmpleados[i].DNI;
                            row["NOMBRE"] = datosEmpleados[i].NOMBRE;
                            row["APELLIDO"] = datosEmpleados[i].APELLIDO;
                            employeeFilteredTable.Rows.Add(row);
                        }
                    }
                }


                dgvEmployees.DataSource = employeeFilteredTable;  
            } else
            {
                MessageBox.Show("No se ingreso ningun filtro");
            }

        }

        private void btnLimpiarCampos_Click(object sender, EventArgs e)
        {
            txtNombre.Text = "";
            txtApellido.Text = "";
            txtDNI.Text = "";
            dgvEmployees.DataSource = datosEmpleados;
        }

        private void txtNombre_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (Char.IsLetter(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (Char.IsControl(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (Char.IsSeparator(e.KeyChar))
            {
                e.Handled = false;
            }
            else
            {
                e.Handled = true;
            }
        }

        private void txtApellido_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (Char.IsLetter(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (Char.IsControl(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (Char.IsSeparator(e.KeyChar))
            {
                e.Handled = false;
            }
            else
            {
                e.Handled = true;
            }
        }

        private void txtDNI_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (Char.IsDigit(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (Char.IsControl(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (Char.IsSeparator(e.KeyChar))
            {
                e.Handled = false;
            }
            else if (e.KeyChar == (char)32)
            {
                e.Handled = false;
            }
            else
            {
                e.Handled = true;
            }
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            if (txtNombre.Text.Length > 0)
            {
                activarLimpiarCampos();
                txtApellido.Enabled = false;
                txtDNI.Enabled = false;
            }
            else
            {
                desactivarLimpiarCampos();
                txtApellido.Enabled = true;
                txtDNI.Enabled = true;
                dgvEmployees.DataSource = datosEmpleados;
            }
        }

        private void txtApellido_TextChanged(object sender, EventArgs e)
        {
            if (txtApellido.Text.Length > 0)
            {
                activarLimpiarCampos();
                txtNombre.Enabled = false;
                txtDNI.Enabled = false;
            }
            else
            {
                desactivarLimpiarCampos();
                txtNombre.Enabled = true;
                txtDNI.Enabled = true;
                dgvEmployees.DataSource = datosEmpleados;
            }
        }

        private void txtDNI_TextChanged(object sender, EventArgs e)
        {
            if (txtDNI.Text.Length > 0)
            {
                activarLimpiarCampos();
                txtApellido.Enabled = false;
                txtNombre.Enabled = false;
            }
            else
            {
                desactivarLimpiarCampos();
                txtApellido.Enabled = true;
                txtNombre.Enabled = true;
                dgvEmployees.DataSource = datosEmpleados;
            }
        }

        private void activarLimpiarCampos()
        {
            btnLimpiarCampos.BackgroundColor = ColorTranslator.FromHtml("#383C77");
            btnLimpiarCampos.TextColor = Color.White;
            btnLimpiarCampos.Enabled = true;
        }

        private void desactivarLimpiarCampos()
        {
            btnLimpiarCampos.BackgroundColor = Color.White;
            btnLimpiarCampos.TextColor = Color.Black;
            btnLimpiarCampos.Enabled = false;
        }

    }
}
