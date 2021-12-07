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
        DataTable fingersTable = new DataTable();
        Reply oReply = new Reply();
        string txtLblCurrent;

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
            getFingers();
        }


        private async void getFingers()
        {
            string url = "http://localhost:3001/api/fingerPrints/" + Convert.ToString(EmployeeSelected.Rows[0][0]);
            List<FingerXEmployee> listado = new List<FingerXEmployee>();
            oReply = await Consumer.Execute<List<FingerXEmployee>>(url, methodHttp.GET, listado);
            this.dgvFingerEmployee.DataSource = oReply.Data;
            fingersTable = ConvertDgvToTable(dgvFingerEmployee);
            onOffButtons();
        }


        private void onOffButtons()
        {
            int cantidad = fingersTable.Rows.Count;
            if (cantidad > 0)
            {
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingersTable.Rows[i][1]) == lblPD.Text)
                    {
                        btnCapturarPD.Enabled = false;
                        btnEliminarPD.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarPD.Enabled = true;
                        btnEliminarPD.Enabled = false;
                    }
                }
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingersTable.Rows[i][1]) == lblID.Text)
                    {
                        btnCapturarID.Enabled = false;
                        btnEliminarID.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarID.Enabled = true;
                        btnEliminarID.Enabled = false;
                    }
                }
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingersTable.Rows[i][1]) == lblPI.Text)
                    {
                        btnCapturarPI.Enabled = false;
                        btnEliminarPI.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarPI.Enabled = true;
                        btnEliminarPI.Enabled = false;
                    }
                }
                for (int i = 0; i < cantidad; i++)
                {
                    if (Convert.ToString(fingersTable.Rows[i][1]) == lblII.Text)
                    {
                        btnCapturarII.Enabled = false;
                        btnEliminarII.Enabled = true;
                        break;
                    }
                    else
                    {
                        btnCapturarII.Enabled = true;
                        btnEliminarII.Enabled = false;
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
            }
        }

        private DataTable ConvertDgvToTable(DataGridView dgv)
        {
            DataTable table = new DataTable();
            DataColumn cDni = new DataColumn("dni");
            DataColumn cFinger = new DataColumn("finger");
            table.Columns.Add(cDni);
            table.Columns.Add(cFinger);

            for (int i = 0; i < dgv.RowCount; i++)
            {
                DataRow row = table.NewRow();
                row["dni"] = dgv.Rows[i].Cells[0].Value;
                row["finger"] = dgv.Rows[i].Cells[1].Value;
                table.Rows.Add(row);
            }
            return table;
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

        private async void deleteFingers()
        {
            string message = "Esta seguro que desea eliminar la huella del "+ txtLblCurrent + "?";
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
    }
}