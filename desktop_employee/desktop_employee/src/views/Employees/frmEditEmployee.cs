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
        private DPFP.Template Template;
        private DataTable employeeSelected;

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
        }

        private void btnCapturarPD_Click(object sender, EventArgs e)
        {
            frmCaptureFingerPrint captureFingerPrint = new();
            captureFingerPrint.OnTemplate += this.OnTemplate;
            captureFingerPrint.ShowDialog();
        }

        private void OnTemplate(DPFP.Template template)
        {
            this.Invoke(new Function(delegate ()
            {
                Template = template;
                btnAceptar.Enabled = (Template != null);
                if (Template != null)
                {
                    MessageBox.Show("The fingerprint template is ready for fingerprint verification.", "Fingerprint Enrollment");
                    txtDedoPD.Text = "Huella capturada correctamente";
                }
                else
                {
                    MessageBox.Show("The fingerprint template is not valid. Repeat fingerprint enrollment.", "Fingerprint Enrollment");
                }
            }));
        }

        private async void btnAceptar_ClickAsync(object sender, EventArgs e)
        {
            try
            {
                byte[] streamFingerPrint = Template.Bytes;
                FingerPrint fingerPrint = new()
                {
                    dni = Convert.ToInt32(txtDni.Text),
                    finger = "dedo pulgar derecho",
                    fingerPrint = streamFingerPrint
                };
                Reply oReply = new Reply();
                oReply = await Consumer.Execute<FingerPrint>("http://localhost:3001/api/fingerPrints", methodHttp.POST, fingerPrint);
                MessageBox.Show(oReply.StatusCode);

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            frmEmployees employees = new();
            
            //OpenForm(employees);
            if (pnlPadre.Controls.Count > 0)
                pnlPadre.Controls.RemoveAt(0);
            employees.TopLevel = false;
            employees.Dock = DockStyle.Fill;
            pnlPadre.Controls.Add(employees);
            employees.PnlPadre = pnlPadre;
            employees.Show();
        }
    }
}
