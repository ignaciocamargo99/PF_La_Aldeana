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
        private DataTable tableFingers;
        Reply oReply = new Reply();

        private Panel pnlPadre;

        public Panel PnlPadre { get => pnlPadre; set => pnlPadre = value; }
        public DataTable EmployeeSelected { get => employeeSelected; set => employeeSelected = value; }

        public frmEditEmployee()
        {
            InitializeComponent();
        }


        private async void frmEditEmployee_LoadAsync(object sender, EventArgs e)
        {
            txtDni.Text = Convert.ToString(EmployeeSelected.Rows[0][0]);
            txtNombre.Text = Convert.ToString(EmployeeSelected.Rows[0][1]);
            txtApellido.Text = Convert.ToString(EmployeeSelected.Rows[0][2]);

            tableFingers = loadTableFingers();

            string url = "http://localhost:3001/api/fingerPrints/" + Convert.ToString(EmployeeSelected.Rows[0][0]);
            List<FingerXEmployee> listado = new List<FingerXEmployee>();
            oReply = await Consumer.Execute<List<FingerXEmployee>>(url, methodHttp.GET, listado);
            this.dgvFingerEmployee.DataSource = oReply.Data;

            if (this.dgvFingerEmployee != null && this.dgvFingerEmployee.Rows.Count > 0)
            {
                btnAceptar.Enabled = true;
            }
            
            cboDedo.DataSource = tableFingers;
            cboDedo.DisplayMember = "name_finger";
            cboDedo.ValueMember = "id_finger";
            cboDedo.SelectedIndex = -1;

        }

        private DataTable loadTableFingers()
        {
            DataTable table = new DataTable();
            DataColumn cId = new DataColumn("id_finger");
            cId.DataType = System.Type.GetType("System.Int32");
            DataColumn cNameFinger = new DataColumn("name_finger");
            table.Columns.Add(cId);
            table.Columns.Add(cNameFinger);
            
            DataRow row1 = table.NewRow();
            row1["id_finger"] = 1;
            row1["name_finger"] = "Dedo Pulgar Derecho";
            table.Rows.Add(row1);
            DataRow row2 = table.NewRow();
            row2["id_finger"] = 2;
            row2["name_finger"] = "Dedo Pulgar Izquierdo";
            table.Rows.Add(row2);
            DataRow row3 = table.NewRow();
            row3["id_finger"] = 3;
            row3["name_finger"] = "Dedo Índice Derecho";
            table.Rows.Add(row3);
            DataRow row4 = table.NewRow();
            row4["id_finger"] = 4;
            row4["name_finger"] = "Dedo Índice Izquierdo";
            table.Rows.Add(row4);

            return table;
        }

        private void btnCapturarPD_Click(object sender, EventArgs e)
        {
            frmCaptureFingerPrint captureFingerPrint = new();
            captureFingerPrint.OnTemplate += this.OnTemplate;
            captureFingerPrint.Show();
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
                    txtInfo.Text = "Huella capturada correctamente";
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
                    finger = Convert.ToString(cboDedo.GetItemText(cboDedo.SelectedItem)),
                    fingerPrint = streamFingerPrint
                };
                
                oReply = await Consumer.Execute<FingerPrint>("http://localhost:3001/api/fingerPrints", methodHttp.POST, fingerPrint);

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            frmEmployees employees = new();
            employees.PnlPadre = pnlPadre;
            OpenForm(employees);
        }

        private void btnCancelar_Click(object sender, EventArgs e)
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

        private void cboDedo_SelectedIndexChanged(object sender, EventArgs e)
        {
            btnCapturarPD.Enabled = true;
        }
    }
}