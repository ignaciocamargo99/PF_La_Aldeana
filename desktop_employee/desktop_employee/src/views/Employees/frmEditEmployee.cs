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

        private Panel pnlPadre;

        public Panel PnlPadre { get => pnlPadre; set => pnlPadre = value; }
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
            getFingers();
        }


        private async void getFingers()
        {
            var urlGet = "http://localhost:3001/api/fingerPrints/" + Convert.ToString(EmployeeSelected.Rows[0][0]);
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
                onOffButtons();
            }
            catch (WebException ex)
            {
                // Handle error
            }            
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
                    MessageBox.Show("La huella no es valida. Repita el proceso de captura.", "Captura de la Huella");
                }
            }));
        }

        private void btnAceptar_Click(object sender, EventArgs e)
        {
            frmEmployees employees = new();
            employees.PnlPadre = pnlPadre;
            OpenForm(employees);
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
                oReply = await Consumer.Execute<FingerPrint>("http://localhost:3001/api/fingerPrints", methodHttp.POST, fingerPrint);
                getFingers();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
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
            string message = "Esta seguro que desea eliminar la huella del " + txtLblCurrent + "?";
            DialogResult result = MessageBox.Show(message, "Confirmación", MessageBoxButtons.YesNo);
            if (result == DialogResult.Yes)
            {
                try
                {
                    FingerXEmployee fingerPrint = new()
                    {
                        dniEmployee = Convert.ToInt32(txtDni.Text),
                        finger = txtLblCurrent
                    };
                    oReply = await Consumer.Execute<FingerXEmployee>("http://localhost:3001/api/fingerPrints", methodHttp.PUT, fingerPrint);
                    if (oReply.StatusCode == "OK")
                    {
                        MessageBox.Show("Huella eliminada correctamente.");
                        getFingers();
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
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
            frmValidationFingerprint validationForm = new();
            validationForm.HuellasEmpleado = fingerEmployee;
            validationForm.HuellaAcomparar = txtLblCurrent;
            validationForm.Show();
        }


    }
}