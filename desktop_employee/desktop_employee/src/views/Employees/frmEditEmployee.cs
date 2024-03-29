﻿using System;
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
using Newtonsoft.Json;

namespace desktop_employee.src.views.Employees
{
    public partial class frmEditEmployee : Form
    {
        private DPFP.Template Template;
        private DataTable employeeSelected;
        dynamic fingerEmployee;
        Reply oReply = new Reply();
        string txtLblCurrent;
        config config = new();
        private int permisos;
        bool tenemosHuellas;
        bool registroOk;

        private Panel pnlPadre;

        public Panel PnlPadre { get => pnlPadre; set => pnlPadre = value; }
        public DataTable EmployeeSelected { get => employeeSelected; set => employeeSelected = value; }
        public int Permisos { get => permisos; set => permisos = value; }

        public frmEditEmployee()
        {
            InitializeComponent();
        }

        private void frmEditEmployee_Load(object sender, EventArgs e)
        {
            txtDni.Text = Convert.ToString(EmployeeSelected.Rows[0][0]);
            txtNombre.Text = Convert.ToString(EmployeeSelected.Rows[0][1]);
            txtApellido.Text = Convert.ToString(EmployeeSelected.Rows[0][2]);
            getFingers();

            if (permisos == 2)
            {
                btnEliminarPD.Visible = false;
                btnEliminarID.Visible = false;
                btnEliminarPI.Visible = false;
                btnEliminarII.Visible = false;
            }
        }


        private async void getFingers()
        {
            var urlGet = config.getUrlPort() + "/api/fingerPrints/" + Convert.ToString(EmployeeSelected.Rows[0][0]);
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
                fingerEmployee = JsonConvert.DeserializeObject(responseBody);
                tenemosHuellas = true;
            }
            catch (WebException ex)
            {
                tenemosHuellas = false;
            }
            if (!tenemosHuellas)
            {
                MessageBox.Show("No se obuvieron los datos de las huelas del empleado. Reinicie la aplicación!", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            onOffButtons();
        }


        private void onOffButtons()
        {
            int cantidad = fingerEmployee.Count;
            if (cantidad > 0)
            {
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingerEmployee[i].finger) == lblPD.Text)
                    {
                        btnCapturarPD.Enabled = false;
                        btnEliminarPD.Enabled = true;
                        btnComprobarPD.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarPD.Enabled = true;
                        btnEliminarPD.Enabled = false;
                        btnComprobarPD.Enabled = false;
                    }
                }
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingerEmployee[i].finger) == lblID.Text)
                    {
                        btnCapturarID.Enabled = false;
                        btnEliminarID.Enabled = true;
                        btnComprobarID.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarID.Enabled = true;
                        btnEliminarID.Enabled = false;
                        btnComprobarID.Enabled = false;
                    }
                }
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingerEmployee[i].finger) == lblPI.Text)
                    {
                        btnCapturarPI.Enabled = false;
                        btnEliminarPI.Enabled = true;
                        btnComprobarPI.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarPI.Enabled = true;
                        btnEliminarPI.Enabled = false;
                        btnComprobarPI.Enabled = false;
                    }
                }
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingerEmployee[i].finger) == lblII.Text)
                    {
                        btnCapturarII.Enabled = false;
                        btnEliminarII.Enabled = true;
                        btnComprobarII.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarII.Enabled = true;
                        btnEliminarII.Enabled = false;
                        btnComprobarII.Enabled = false;
                    }
                }
            }
            else
            {
                btnCapturarPD.Enabled = true;
                btnCapturarID.Enabled = true;
                btnCapturarPI.Enabled = true;
                btnCapturarII.Enabled = true;
                btnEliminarPD.Enabled = false;
                btnEliminarID.Enabled = false;
                btnEliminarPI.Enabled = false;
                btnEliminarII.Enabled = false;
                btnComprobarPD.Enabled = false;
                btnComprobarID.Enabled = false;
                btnComprobarPI.Enabled = false;
                btnComprobarII.Enabled = false;
            }
        }

        private void OnTemplate(DPFP.Template template)
        {
            this.Invoke(new Function(delegate ()
            {
                Template = template;
                if (Template != null)
                {
                    RegisterFingerAsync();
                }
                else
                {
                    MessageBox.Show("La huella no es valida. Repita el proceso de captura.", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }));
        }

        private void btnAceptar_Click(object sender, EventArgs e)
        {
            frmEmployees employees = new();
            employees.Tag = "Empl_Main";
            employees.PnlPadre = pnlPadre;
            OpenForm(employees);
        }

        private void OpenForm(Form form)
        {
            for (int i = 0; i < Application.OpenForms.Count; i++)
            {
                var tag = Application.OpenForms[i].Tag;
                if (tag == "Empl_Sub")
                {
                    Application.OpenForms[i].Close();
                    i--;
                }
            }
            if (pnlPadre.Controls.Count > 0)
                pnlPadre.Controls.RemoveAt(0);
            form.TopLevel = false;
            form.Dock = DockStyle.Fill;
            pnlPadre.Controls.Add(form);
            form.Show();
        }

        private void btnCapturarPD_Click(object sender, EventArgs e)
        {
            OpenFormCaptureAsync(lblPD);
        }

        private void btnCapturarID_Click(object sender, EventArgs e)
        {
            OpenFormCaptureAsync(lblID);
        }

        private void btnCapturarPI_Click(object sender, EventArgs e)
        {
            OpenFormCaptureAsync(lblPI);
        }

        private void btnCapturarII_Click(object sender, EventArgs e)
        {
            OpenFormCaptureAsync(lblII);
        }

        private void OpenFormCaptureAsync(Label lblFinger)
        {
            if (!tenemosHuellas)
            {
                MessageBox.Show("No se obuvieron los datos de las huelas del empleado. Reinicie la aplicación!", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            frmCaptureFingerPrint captureFingerPrint = new();
            txtLblCurrent = lblFinger.Text;
            captureFingerPrint.OnTemplate += this.OnTemplate;
            captureFingerPrint.Show();
        }

        private async void RegisterFingerAsync()
        {
            try
            {
                byte[] streamFingerPrint = Template.Bytes;
                FingerPrint fingerPrint = new()
                {
                    dni = Convert.ToInt32(txtDni.Text),
                    finger = txtLblCurrent,
                    fingerPrint = streamFingerPrint
                };
                oReply = await Consumer.Execute<FingerPrint>(config.getUrlPort() + "/api/fingerPrints", methodHttp.POST, fingerPrint);
            }
            catch (Exception ex)
            {   
            }
            if (oReply.StatusCode != "OK")
            {
                MessageBox.Show("No se pudo registrar la huella. Intente de nuevo !", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            getFingers();
        }

        private void btnEliminarPD_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblPD.Text;
            deleteFingers();
        }

        private void btnEliminarID_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblID.Text;
            deleteFingers();
        }

        private void btnEliminarPI_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblPI.Text;
            deleteFingers();
        }

        private void btnEliminarII_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblII.Text;
            deleteFingers();
        }

        private async void deleteFingers()
        {
            if (!tenemosHuellas)
            {
                MessageBox.Show("No se obuvieron los datos de las huelas del empleado. Reinicie la aplicación!", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            string message = "Esta seguro que desea eliminar la huella del " + txtLblCurrent + "?";
            DialogResult result = MessageBox.Show(message, "Confirmación", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (result == DialogResult.Yes)
            {
                try
                {
                    FingerXEmployee fingerPrint = new()
                    {
                        dniEmployee = Convert.ToInt32(txtDni.Text),
                        finger = txtLblCurrent
                    };
                    oReply = await Consumer.Execute<FingerXEmployee>(config.getUrlPort() + "/api/fingerPrints", methodHttp.PUT, fingerPrint);
                    if (oReply.StatusCode == "OK")
                    {
                        MessageBox.Show("Huella eliminada correctamente.", "Información !!!", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        getFingers();
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message, "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void btnComprobarPD_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblPD.Text;
            comprobarHuella();
        }

        private void btnComprobarID_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblID.Text;
            comprobarHuella();
        }

        private void btnComprobarPI_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblPI.Text;
            comprobarHuella();
        }

        private void btnComprobarII_Click(object sender, EventArgs e)
        {
            txtLblCurrent = lblII.Text;
            comprobarHuella();
        }

        private void comprobarHuella()
        {
            if (!tenemosHuellas)
            {
                MessageBox.Show("No se obuvieron los datos de las huelas del empleado. Reinicie la aplicación!", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            frmValidationFingerprint validationForm = new();
            validationForm.HuellasEmpleado = fingerEmployee;
            validationForm.HuellaAcomparar = txtLblCurrent;
            string cadena = Convert.ToString(EmployeeSelected.Rows[0][1]) + " " + Convert.ToString(EmployeeSelected.Rows[0][2]);
            validationForm.NombreEmpleado = cadena; 
            validationForm.Show();
        }

    }
}