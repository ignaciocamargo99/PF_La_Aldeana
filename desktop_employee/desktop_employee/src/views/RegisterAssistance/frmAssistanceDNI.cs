using Newtonsoft.Json;
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

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmAssistanceDNI : Form
    {
        bool activo = true;
        bool seVerifico;
        bool esRepetido;
        Reply oReply = new Reply();
        dynamic datosDNIs;
        DataTable ultimosRegistros;
        config config = new();

        public frmAssistanceDNI()
        {
            InitializeComponent();
        }

        private void frmAssistanceDNI_Load(object sender, EventArgs e)
        {
            var urlGet = config.getUrlPort() + "/api/employeesDesktop";
            var requestGet = (HttpWebRequest)WebRequest.Create(urlGet);
            requestGet.Method = "GET";
            requestGet.ContentType = "application/json";
            requestGet.Accept = "application/json";
            try
            {
                using (WebResponse response = requestGet.GetResponse())
                {
                    using (Stream strReader = response.GetResponseStream())
                    {
                        if (strReader == null) return;
                        using (StreamReader objReader = new StreamReader(strReader))
                        {
                            string responseBody = objReader.ReadToEnd();
                            datosDNIs = JsonConvert.DeserializeObject(responseBody);
                        }
                    }
                }
            }
            catch (WebException ex)
            {
                // Handle error
            }
        }

        private DataTable crearTablaRegistros()
        {
            DataTable table = new();
            DataColumn colDNI = new DataColumn("DNI");
            DataColumn colHora = new DataColumn("Hora");
            table.Columns.Add(colDNI);
            table.Columns.Add(colHora);
            return table;
        }

        private bool empleadoRepetido(int dni)
        {
            for (int i = 0; i < ultimosRegistros.Rows.Count; i++)
            {
                if (Convert.ToInt32(ultimosRegistros.Rows[i]["DNI"]) == dni && Convert.ToInt32((DateTime.Now - Convert.ToDateTime(ultimosRegistros.Rows[i]["Hora"])).TotalMinutes) < 5)
                {
                    return true;
                }
            }
            return false;
        }

        private void cargarRegistros(int dni, DateTime dateTime)
        {
            DataRow row = ultimosRegistros.NewRow();
            row["DNI"] = dni;
            row["Hora"] = dateTime;
            ultimosRegistros.Rows.Add(row);
        }

        private void borrarRegistrosViejos()
        {
            for (int i = 0; i < ultimosRegistros.Rows.Count; i++)
            {
                if (Convert.ToInt32((DateTime.Now - Convert.ToDateTime(ultimosRegistros.Rows[i]["Hora"])).TotalMinutes) > 5)
                {
                    ultimosRegistros.Rows[i].Delete();
                }
            }
        }

        private string convertDateTimeToString(DateTime datetime)
        {
            string timeInOut = Convert.ToString(datetime.Year) + "-" + Convert.ToString(datetime.Month) + "-" +
                Convert.ToString(datetime.Day) + " " + Convert.ToString(datetime.Hour) + ":" +
                Convert.ToString(datetime.Minute) + ":" + Convert.ToString(datetime.Second);
            return timeInOut;
        }

        private void mostrarNombre(string name, string last_name)
        {
            string nameEmployee = name + " " + last_name;
            MakeReport("El DNI fue verificado y es de " + nameEmployee);
            SetEmployee(nameEmployee);
        }

        private void SetPrompt(string prompt)
        {
            lblPromt.Text = prompt;
        }

        private void MakeReport(string message)
        {
            if (activo)
            {
                StatusText.AppendText(message + "\r\n");
            }
        }

        private void SetEmployee(string nameSurname)
        {
            if (activo)
            {
                lblEmployee.Text = nameSurname;
            }
        }

        private void SetHoraEntrada(string horaEntrada)
        {
            if (activo)
            {
                lblHoraEntrada.Text = horaEntrada;
            }
        }

        private void SetHoraSalida(string horaSalida)
        {
            if (activo)
            {
                lblHoraSalida.Text = horaSalida;
            }
        }

        private void SetInfo(string info)
        {
            if (activo)
            {
                lblInfo.Text = info;
            }
        }

        private void MostrarAzul()
        {
            if (activo)
            {
                iconEsperando.Visible = true;
            }
        }

        private void OcultarAzul()
        {
            iconEsperando.Visible = false;
        }

        private void MostrarVerde()
        {
            iconAceptado.Visible = true;
        }

        private void OcultarVerde()
        {
            if (activo)
            {
                iconAceptado.Visible = false;
            }
        }

        private void MostrarRojo()
        {
            iconError.Visible = true;
        }

        private void OcultarRojo()
        {
            if (activo)
            {
                iconError.Visible = false;
            }
        }

        private void frmAssistanceDNI_FormClosing(object sender, FormClosingEventArgs e)
        {
            activo = false;
        }

        private void btnRegistrarAsistencia_Click(object sender, EventArgs e)
        {

        }
    }
}
