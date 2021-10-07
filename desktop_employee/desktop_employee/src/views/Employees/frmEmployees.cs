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
    public partial class frmEmployees : Form
    {
        public frmEmployees()
        {
            InitializeComponent();
        }

        private async void btnGETEmpleados_Click(object sender, EventArgs e)
        {
            //Creamos el listado de Posts a llenar
            List<Employee> listado = new List<Employee>();
            //Instanciamos un objeto Reply
            Reply oReply = new Reply();
            //poblamos el objeto con el método generic Execute
            oReply = await Consumer.Execute<List<Employee>>("http://localhost:3001/api/employees", methodHttp.GET, listado);
            //Poblamos el datagridview
            this.dgvEmployees.DataSource = oReply.Data;
            //Mostramos el statuscode devuelto, podemos añadirle lógica de validación
            MessageBox.Show(oReply.StatusCode);
        }
    }
}
