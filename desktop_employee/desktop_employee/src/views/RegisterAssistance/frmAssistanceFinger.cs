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
using desktop_employee.src.entities;
using Newtonsoft.Json;

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmAssistanceFinger : VerificationForm
    {
        private DPFP.Template Template;
        private DPFP.Verification.Verification Verificator;
        bool seVerifico;
        bool esRepetido;
        Reply oReply = new Reply();
        dynamic datosHuellas;
        DataTable ultimosRegistros;
        config config = new();
        bool tenemosHuellas = true;
        bool tenemosHorarios;
        dynamic datosAsistencia;

        public frmAssistanceFinger()
        {
            InitializeComponent();
        }

        public void Verify(DPFP.Template template)
        {
            Template = template;
            ShowDialog();
        }

        protected override void Init()
        {
            base.Init();
            Verificator = new DPFP.Verification.Verification();
            ultimosRegistros = crearTablaRegistros();
            var urlGet = config.getUrlPort() + "/api/fingerPrints";
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
                            datosHuellas = JsonConvert.DeserializeObject(responseBody);
                        }
                    }
                }
            }
            catch (WebException ex)
            {
                tenemosHuellas = false;
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

        protected override async void ProcessAsync(DPFP.Sample Sample)
        {
            if (!tenemosHuellas)
            {
                MessageBox.Show("No se obtuvieron las huellas correctamente. Reinicie la aplicación.", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            base.ProcessAsync(Sample);
            DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);

            if (features != null)
            {
                DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();
                seVerifico = false;
                esRepetido = false;
                DPFP.Template template = new DPFP.Template();
                Stream stream;
                for (int i = 0; i < datosHuellas.Count; i++)
                {
                    if (datosHuellas[i].finger_print != null)
                    {
                        stream = new MemoryStream((byte[])datosHuellas[i].finger_print);
                        template = new DPFP.Template(stream);
                        Verificator.Verify(features, template, ref result);
                        if (result.Verified)
                        {
                            borrarRegistrosViejos();
                            if (empleadoRepetido(Convert.ToInt32(datosHuellas[i].dniEmployee)))
                            {
                                var urlGet = config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosHuellas[i].dniEmployee);
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
                                                datosAsistencia = JsonConvert.DeserializeObject(responseBody);

                                                tenemosHorarios = true;
                                            }
                                        }
                                    }
                                }
                                catch (WebException ex)
                                {
                                    tenemosHorarios = false;
                                }
                                if (tenemosHorarios)
                                {
                                    DateTime horaEntrada = datosAsistencia[0].date_entry;
                                    if (config.getEnviroment() == "L")
                                    {
                                        horaEntrada = horaEntrada.AddHours(-3);
                                    }
                                    SetHoraEntrada(Convert.ToString(horaEntrada));

                                    if (datosAsistencia[0].date_egress != null)
                                    {
                                        DateTime horaSalida = datosAsistencia[0].date_egress;
                                        if (config.getEnviroment() == "L")
                                        {
                                            horaSalida = horaSalida.AddHours(-3);
                                        }
                                        SetHoraSalida(Convert.ToString(horaSalida));
                                    }
                                }    
                                else
                                {
                                    MakeReport("No se puede cargar la última asistencia.");
                                }
                                mostrarNombre(Convert.ToString(datosHuellas[i].name), Convert.ToString(datosHuellas[i].last_name));
                                errorHuella("La huella fue ingresada en los últimos 5 minutos.");                               
                                esRepetido = true;
                                break;                             
                            }
                            else
                            {
                                seVerifico = true;
                                mostrarNombre(Convert.ToString(datosHuellas[i].name), Convert.ToString(datosHuellas[i].last_name));
                                DateTime timeInOut = DateTime.Now;
                                string timeInOutFormated = convertDateTimeToString(timeInOut);

                                CheckAsistencia checkAsistencia = new()
                                {
                                    datetime = timeInOutFormated
                                };
                                oReply = await Consumer.Execute<CheckAsistencia>(config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosHuellas[i].dniEmployee), methodHttp.POST, checkAsistencia);

                                if (oReply.StatusCode == "OK")
                                {
                                    MakeReport("La asistencia se registro correctamente.");
                                }
                                else
                                {
                                    MakeReport("Se produjo un error. Reintente de nuevo.");
                                }

                                var urlGet = config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosHuellas[i].dniEmployee);
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
                                                datosAsistencia = JsonConvert.DeserializeObject(responseBody);

                                                tenemosHorarios = true;
                                            }
                                        }
                                    }
                                }
                                catch (WebException ex)
                                {
                                    tenemosHorarios = false;
                                }

                                if (tenemosHorarios)
                                {
                                    DateTime horaEntrada = datosAsistencia[0].date_entry;
                                    if (config.getEnviroment() == "L")
                                    {
                                        horaEntrada = horaEntrada.AddHours(-3);
                                    }
                                    SetHoraEntrada(Convert.ToString(horaEntrada));

                                    if (datosAsistencia[0].date_egress != null)
                                    {
                                        DateTime horaSalida = datosAsistencia[0].date_egress;
                                        if (config.getEnviroment() == "L")
                                        {
                                            horaSalida = horaSalida.AddHours(-3);
                                        }
                                        SetHoraSalida(Convert.ToString(horaSalida));
                                    }
                                }
                                else
                                {
                                    MakeReport("No se puede cargar los datos de la asistencia registrada.");
                                }

                                if (oReply.StatusCode == "OK")
                                {
                                    MostrarVerde();
                                }
                                else
                                {
                                    MostrarRojo();
                                }
                                
                                OcultarAzul();

                                for (int j = 5; j >= 1; j--)
                                {
                                    SetInfo("Espere " + j + " segundos para ingresar la siguiente huella.");
                                    Thread.Sleep(1000);
                                }
                                SetInfo("LISTO PARA COLOCAR DEDO");

                                

                                if (oReply.StatusCode == "OK")
                                {
                                    OcultarVerde();
                                    cargarRegistros(Convert.ToInt32(datosHuellas[i].dniEmployee), timeInOut);
                                }
                                else
                                {
                                    OcultarRojo();
                                }
                                MostrarAzul();

                                SetHoraEntrada("--/--/---- --:--:--");
                                SetHoraSalida("--/--/---- --:--:--");
                                SetEmployee("");
                                CleanPicture();
                                MakeReport("Ingrese la siguiente huella.");
                                break;
                            }
                        }
                    }
                }
                if (!seVerifico && !esRepetido)
                {
                    errorHuella("La huella no coincidie con ningún empleado.");
                }
            }
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

        private void errorHuella(string report1)
        {
            MakeReport(report1);
            MostrarRojo();
            OcultarAzul();
            for (int i = 5; i >= 1; i--)
            {
                SetInfo("Espere " + i + " segundos para ingresar la siguiente huella.");
                Thread.Sleep(1000);
            }
            SetInfo("LISTO PARA COLOCAR DEDO");
            MakeReport("Ingrese la siguiente huella.");
            CleanPicture();
            SetHoraEntrada("--/--/---- --:--:--");
            SetHoraSalida("--/--/---- --:--:--");
            SetEmployee("");
            OcultarRojo();
            MostrarAzul();
        }

        private void mostrarNombre(string name, string last_name)
        {
            string nameEmployee = name + " " + last_name;
            MakeReport("La huella fue verificada y es de " + nameEmployee);
            SetEmployee(nameEmployee);
        }
    }
}
