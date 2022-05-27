using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
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
        private int permisos;
        config config = new();
        DataTable employeeFilteredTable = new DataTable();
        bool tenemosDatos;

        public Panel PnlPadre { get => pnlPadre; set => pnlPadre = value; }
        public int Permisos { get => permisos; set => permisos = value; }

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
                tenemosDatos = true;
            }
            catch (WebException ex)
            {
                tenemosDatos = false;
            }
            if (datosEmpleados != null && datosEmpleados.Count > 0)
            {
                btnEditEmployee.BackgroundColor = ColorTranslator.FromHtml("#383C77");
                btnEditEmployee.TextColor = Color.White;
                btnEditEmployee.Enabled = true;
            }

            if (permisos == 1)
            {
                btnEditEmployee.Visible = false;
            }

            if (!tenemosDatos)
            {
                MessageBox.Show("No se obuvieron los datos de los empleados. Reinicie la aplicación!", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            this.dgvEmployees.DataSource = datosEmpleados;
            foreach (DataGridViewTextBoxColumn column in dgvEmployees.Columns)
            {
                column.Width = 250;
            }
        }

        private DataTable createTableEmployee()
        {
            DataTable table = new DataTable();
            DataColumn cDni = new DataColumn("DNI");
            DataColumn cName = new DataColumn("NOMBRE");
            DataColumn cLastName = new DataColumn("APELLIDO");
            DataColumn cHuellas = new DataColumn("HUELLAS");
            table.Columns.Add(cDni);
            table.Columns.Add(cName);
            table.Columns.Add(cLastName);
            table.Columns.Add(cHuellas);

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
                frmEditEmployee.Permisos = permisos;
                OpenForm(frmEditEmployee);
            }
            else
            {
                MessageBox.Show("No se selecciono nungún empleado.", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
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

        private void filtrar()
        {
            if (txtNombre.Text != "" || txtDNI.Text != "" || cbxSinHuella.Checked)
            {
                employeeFilteredTable = createTableEmployee();

                var nombreCompleto = "";

                var nombreIngresado = "";

                var dniIngresado = "";
                var dniEmpleado = "";

                if (txtNombre.Text != "")
                {
                    nombreIngresado = txtNombre.Text.ToUpper();
                    nombreIngresado = eliminarAcentos(nombreIngresado);
                }

                if (txtDNI.Text != "")
                {
                    dniIngresado = txtDNI.Text;
                }

                if (!tenemosDatos) return;

                for (int i = 0; i < datosEmpleados.Count; i++)
                {
                    nombreCompleto = Convert.ToString((datosEmpleados[i].NOMBRE)).ToUpper() + " " + Convert.ToString((datosEmpleados[i].APELLIDO)).ToUpper();
                    nombreCompleto = eliminarAcentos(nombreCompleto);

                    dniEmpleado = Convert.ToString((datosEmpleados[i].DNI));

                    if (cbxSinHuella.Checked)
                    {
                        if (nombreCompleto.Contains(nombreIngresado) &&
                            dniEmpleado.Contains(dniIngresado) &&
                            Convert.ToInt32(datosEmpleados[i].HUELLAS) == 0)
                        {
                            DataRow row = employeeFilteredTable.NewRow();
                            row["DNI"] = datosEmpleados[i].DNI;
                            row["NOMBRE"] = datosEmpleados[i].NOMBRE;
                            row["APELLIDO"] = datosEmpleados[i].APELLIDO;
                            row["HUELLAS"] = datosEmpleados[i].HUELLAS;
                            employeeFilteredTable.Rows.Add(row);
                        }
                    }
                    else
                    {
                        if (nombreCompleto.Contains(nombreIngresado) &&
                            dniEmpleado.Contains(dniIngresado))
                        {
                            DataRow row = employeeFilteredTable.NewRow();
                            row["DNI"] = datosEmpleados[i].DNI;
                            row["NOMBRE"] = datosEmpleados[i].NOMBRE;
                            row["APELLIDO"] = datosEmpleados[i].APELLIDO;
                            row["HUELLAS"] = datosEmpleados[i].HUELLAS;
                            employeeFilteredTable.Rows.Add(row);
                        }
                    }
                }

                dgvEmployees.DataSource = employeeFilteredTable;
            }
            else
            {
                dgvEmployees.DataSource = datosEmpleados;
            }
        }

        private string eliminarAcentos(string inputString)
        {
            Regex replace_a_Accents = new Regex("[á|à|ä|â|Á]", RegexOptions.Compiled);
            Regex replace_e_Accents = new Regex("[é|è|ë|ê|É]", RegexOptions.Compiled);
            Regex replace_i_Accents = new Regex("[í|ì|ï|î|Í]", RegexOptions.Compiled);
            Regex replace_o_Accents = new Regex("[ó|ò|ö|ô|Ó]", RegexOptions.Compiled);
            Regex replace_u_Accents = new Regex("[ú|ù|ü|û|Ú]", RegexOptions.Compiled);
            inputString = replace_a_Accents.Replace(inputString, "A");
            inputString = replace_e_Accents.Replace(inputString, "E");
            inputString = replace_i_Accents.Replace(inputString, "I");
            inputString = replace_o_Accents.Replace(inputString, "O");
            inputString = replace_u_Accents.Replace(inputString, "U");
            return inputString;
        }

        private void btnLimpiarCampos_Click(object sender, EventArgs e)
        {
            txtNombre.Text = "";
            //txtApellido.Text = "";
            txtDNI.Text = "";
            cbxSinHuella.Checked = false;
            dgvEmployees.DataSource = datosEmpleados;
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {
            activarOdesactivar();
        }

        private void txtApellido_TextChanged(object sender, EventArgs e)
        {
            activarOdesactivar();
        }

        private void txtDNI_TextChanged(object sender, EventArgs e)
        {
            activarOdesactivar();
        }

        private void cbxSinHuella_CheckedChanged(object sender, EventArgs e)
        {
            if (cbxSinHuella.Checked)
            {
                filtrar();
                activarLimpiarCampos();
            }
            else
            {
                activarOdesactivar();
                filtrar();
            }
        }

        private void activarOdesactivar()
        {
            if (txtNombre.Text.Length > 0 || txtDNI.Text.Length > 0) activarLimpiarCampos();
            else desactivarLimpiarCampos();
            filtrar();
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

        private void dgvEmployees_DataBindingComplete(object sender, DataGridViewBindingCompleteEventArgs e)
        {
            for (int i = 0; i < dgvEmployees.RowCount; i++)
            {
                if (Convert.ToInt32(dgvEmployees.Rows[i].Cells[3].Value.ToString()) == 0)
                {
                    dgvEmployees.Rows[i].DefaultCellStyle.BackColor = Color.FromArgb(247, 116, 88);
                }
            }
        }
    }
}
