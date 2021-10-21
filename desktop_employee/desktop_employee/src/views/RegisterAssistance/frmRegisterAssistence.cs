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
using desktop_employee.src.views.RegisterAssistance;

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmRegisterAssistence : Form
    {
        DataTable fingerPrintXEmployeesTable = new DataTable();
        public frmRegisterAssistence()
        {
            InitializeComponent();
        }

        private void btnAssistanceFinger_Click(object sender, EventArgs e)
        {
            frmAssistanceFinger assistanceFinger = new();
            assistanceFinger.FingerPrintXEmployees = fingerPrintXEmployeesTable;
            assistanceFinger.ShowDialog();
        }

        private void btnAssistanceDni_Click(object sender, EventArgs e)
        {
            
        }

        private void frmRegisterAssistence_Load(object sender, EventArgs e)
        {
            GetFingerPrintsXEmployeesAsync();
        }

        private async void GetFingerPrintsXEmployeesAsync()
        {
            List<FingerPrintXEmployee> listado = new List<FingerPrintXEmployee>();
            Reply oReply = new Reply();
            oReply = await Consumer.Execute<List<FingerPrintXEmployee>>("http://localhost:3001/api/fingerPrints", methodHttp.GET, listado);
            this.dgvConvert.Visible = false;
            this.dgvConvert.DataSource = oReply.Data;
            fingerPrintXEmployeesTable = ConvertDgvToTable(dgvConvert);
        }

        private DataTable ConvertDgvToTable(DataGridView dgv)
        {
            DataTable table = new DataTable();
            DataColumn cDni = new DataColumn("dni");
            DataColumn cName = new DataColumn("name");
            DataColumn cLastName = new DataColumn("last_name");
            DataColumn cFingerPrint = new DataColumn("finger_print");
            cFingerPrint.DataType = System.Type.GetType("System.Byte[]");
            table.Columns.Add(cDni);
            table.Columns.Add(cName);
            table.Columns.Add(cLastName);
            table.Columns.Add(cFingerPrint);

            for (int i = 0; i < dgv.RowCount; i++)
            {
                DataRow row = table.NewRow();
                row["dni"] = dgv.Rows[i].Cells[0].Value;
                row["name"] = dgv.Rows[i].Cells[1].Value;
                row["last_name"] = dgv.Rows[i].Cells[2].Value;
                row["finger_print"] = (byte[])dgv.Rows[i].Cells[3].Value;
                table.Rows.Add(row);
            }

            return table;
        }
    }
}
