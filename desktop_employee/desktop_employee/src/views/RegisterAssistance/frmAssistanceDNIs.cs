using desktop_employee.src.entities;
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
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmAssistanceDNIs : Form
    {
        bool activo = true;
        bool seVerifico;
        bool esRepetido;
        Reply oReply = new Reply();
        dynamic datosDNIs;
        DataTable ultimosRegistros;
        config config = new();
        string dniEmpleado = "";
        string info;

        public frmAssistanceDNIs()
        {
            InitializeComponent();
        }

        private void frmAssistanceDNIs_Load(object sender, EventArgs e)
        {
            ultimosRegistros = crearTablaRegistros();
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
            lblInfo.Text = "LISTO PARA INGRESAR EL DNI";
            lblPromt.Text = "Ingresa el DNI para marcar la asistencia.";
            iconEsperando.Visible = true;
            txtDNI.Focus();
        }

        private async void btnRegistrarAsistencia_Click(object sender, EventArgs e)
        {
            seVerifico = false;
            esRepetido = false;
            for (int i = 0; i < datosDNIs.Count; i++)
            {
                if (Convert.ToInt32(datosDNIs[i].DNI) == Convert.ToInt32(dniEmpleado))
                {
                    borrarRegistrosViejos();
                    if (empleadoRepetido(Convert.ToInt32(datosDNIs[i].DNI)))
                    {
                        var urlGet = config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosDNIs[i].DNI);
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
                                        dynamic datosAsistencia = JsonConvert.DeserializeObject(responseBody);

                                        DateTime horaEntrada = datosAsistencia[0].date_entry;
                                        if (config.getEnviroment() == "L")
                                        {
                                            horaEntrada = horaEntrada.AddHours(-3);
                                        }
                                        lblHoraEntrada.Text = (Convert.ToString(horaEntrada));

                                        if (datosAsistencia[0].date_egress != null)
                                        {
                                            DateTime horaSalida = datosAsistencia[0].date_egress;
                                            if (config.getEnviroment() == "L")
                                            {
                                                horaSalida = horaSalida.AddHours(-3);
                                            }
                                            lblHoraSalida.Text = (Convert.ToString(horaSalida));
                                        }
                                    }
                                }
                            }
                        }
                        catch (WebException ex)
                        {
                            // Handle error
                        }
                        string fullName = Convert.ToString(datosDNIs[i].NOMBRE) + " " + Convert.ToString(datosDNIs[i].APELLIDO);
                        StatusText.AppendText("El DNI fue verificado y es de " + fullName + "\r\n");
                        lblEmployee.Text = fullName;

                        StatusText.AppendText("El DNI fue ingresado en los últimos 5 minutos." + "\r\n");
                        iconEsperando.Visible = false;
                        iconError.Visible = true;
                        for (int k = 5; k >= 1; k--)
                        {
                            info = "Espere " + k + " segundos para ingresar el siguiente DNI.";
                            lblInfo.Text = info;
                            Thread.Sleep(1000);
                        }
                        lblInfo.Text = "LISTO PARA INGRESAR EL DNI";
                        StatusText.AppendText("Ingrese el siguiente DNI." + "\r\n");
                        lblHoraEntrada.Text = "--/--/---- --:--:--";
                        lblHoraSalida.Text = "--/--/---- --:--:--";
                        lblEmployee.Text = "";
                        iconError.Visible = false;
                        iconEsperando.Visible = true;

                        esRepetido = true;
                        break;
                    }
                    else
                    {
                        seVerifico = true;
                        string fullName = Convert.ToString(datosDNIs[i].NOMBRE) + " " + Convert.ToString(datosDNIs[i].APELLIDO);
                        StatusText.AppendText("El DNI fue verificado y es de " + fullName + "\r\n");
                        lblEmployee.Text = fullName; DateTime timeInOut = DateTime.Now;
                        string timeInOutFormated = convertDateTimeToString(timeInOut);
                        CheckAsistencia checkAsistencia = new()
                        {
                            datetime = timeInOutFormated
                        };
                        oReply = await Consumer.Execute<CheckAsistencia>(config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosDNIs[i].DNI), methodHttp.POST, checkAsistencia);

                        var urlGet = config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosDNIs[i].DNI);
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
                                        dynamic datosAsistencia = JsonConvert.DeserializeObject(responseBody);

                                        DateTime horaEntrada = datosAsistencia[0].date_entry;
                                        if (config.getEnviroment() == "L")
                                        {
                                            horaEntrada = horaEntrada.AddHours(-3);
                                        }
                                        string stringHoraEntrada = Convert.ToString(horaEntrada);
                                        lblHoraEntrada.Text = stringHoraEntrada;

                                        if (datosAsistencia[0].date_egress != null)
                                        {
                                            DateTime horaSalida = datosAsistencia[0].date_egress;
                                            if (config.getEnviroment() == "L")
                                            {
                                                horaSalida = horaSalida.AddHours(-3);
                                            }
                                            string stringHoraSalida = Convert.ToString(horaSalida);
                                            lblHoraSalida.Text = stringHoraSalida;
                                        }

                                        iconEsperando.Visible = false;
                                        iconAceptado.Visible = true;

                                        for (int j = 5; j >= 1; j--)
                                        {
                                            info = "Espere " + j + " segundos para ingresar el siguiente DNI.";
                                            lblInfo.Text = info;
                                            Thread.Sleep(1000);
                                        }
                                        lblInfo.Text = "LISTO PARA INGRESAR EL DNI";

                                        cargarRegistros(Convert.ToInt32(datosDNIs[i].DNI), timeInOut);

                                        iconAceptado.Visible = false;
                                        iconEsperando.Visible = true;

                                        lblHoraEntrada.Text = "--/--/---- --:--:--";
                                        lblHoraSalida.Text = "--/--/---- --:--:--";
                                        lblEmployee.Text = "";
                                        StatusText.AppendText("Ingrese el siguiente DNI." + "\r\n");
                                    }
                                }
                            }
                        }
                        catch (WebException ex)
                        {
                            // Handle error
                        }

                        break;
                    }
                }
            }
            if (!seVerifico && !esRepetido)
            {
                StatusText.AppendText("El DNI no coincidie con ningún empleado." + "\r\n");
                iconEsperando.Visible = false;
                iconError.Visible = true;
                for (int i = 5; i >= 1; i--)
                {
                    info = "Espere " + i + " segundos para ingresar el siguiente DNI.";
                    lblInfo.Text = info;
                    Thread.Sleep(1000);
                }
                lblInfo.Text = "LISTO PARA INGRESAR EL DNI";
                StatusText.AppendText("Ingrese el siguiente DNI." + "\r\n");
                lblHoraEntrada.Text = "--/--/---- --:--:--";
                lblHoraSalida.Text = "--/--/---- --:--:--";
                lblEmployee.Text = "";
                iconError.Visible = false;
                iconEsperando.Visible = true;
            }
            txtDNI.Text = "";
            txtDNI.Focus();
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

        private void txtDNI_TextChanged(object sender, EventArgs e)
        {
            //controlamos la longitud del dni
            dniEmpleado = txtDNI.Text.Replace(" ", string.Empty);
            if (dniEmpleado.Length == 8)
            {
                btnRegistrarAsistencia.Enabled = true;
                btnRegistrarAsistencia.BackgroundColor = ColorTranslator.FromHtml("#383c77");
                btnRegistrarAsistencia.TextColor = Color.White;
            }
            else
            {
                btnRegistrarAsistencia.Enabled = false;
                btnRegistrarAsistencia.BackgroundColor = Color.White;
                btnRegistrarAsistencia.TextColor = Color.Black;
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
    }
}
