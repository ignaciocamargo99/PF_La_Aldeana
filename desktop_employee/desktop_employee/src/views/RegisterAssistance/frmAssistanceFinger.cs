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
        Reply oReply = new Reply();
        dynamic datosHuellas;

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

            var urlGet = "http://localhost:3001/api/fingerPrints";
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

                            // Do something with responseBody
                            datosHuellas = JsonConvert.DeserializeObject(responseBody);
                        }
                    }
                }
            }
            catch (WebException ex)
            {
                // Handle error
            }

        }

        protected override async void ProcessAsync(DPFP.Sample Sample)
        {
            base.ProcessAsync(Sample);
            DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);

            if (features != null)
            {
                DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();
                seVerifico = false;
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
                            seVerifico = true;



                            string nameEmployee = datosHuellas[i].name + " " + datosHuellas[i].last_name;
                            MakeReport("La huella fue verificada y es de " + nameEmployee);
                            SetEmployee(nameEmployee);


                            DateTime timeInOut = DateTime.Now;
                            string timeInOutFormated = convertDateTimeToString(timeInOut);


                            CheckAsistencia checkAsistencia = new()
                            {
                                datetime = timeInOutFormated
                            };
                            oReply = await Consumer.Execute<CheckAsistencia>("http://localhost:3001/api/assistenceFinger/"+ Convert.ToString(datosHuellas[i].dniEmployee), methodHttp.POST, checkAsistencia);


                            var urlGet = "http://localhost:3001/api/assistenceFinger/" + Convert.ToString(datosHuellas[i].dniEmployee);
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

                                            // Do something with responseBody
                                            dynamic datosAsistencia = JsonConvert.DeserializeObject(responseBody);

                                            DateTime horaEntrada = datosAsistencia[0].date_entry;
                                            horaEntrada = horaEntrada.AddHours(-3);
                                            SetHoraEntrada(Convert.ToString(horaEntrada));

                                            if (datosAsistencia[0].date_egress != null)
                                            {
                                                DateTime horaSalida = datosAsistencia[0].date_egress;
                                                horaSalida = horaSalida.AddHours(-3);
                                                SetHoraSalida(Convert.ToString(horaSalida));
                                            }

                                            MostrarVerde();
                                            OcultarAzul();

                                            Thread.Sleep(5000);

                                            OcultarVerde();
                                            MostrarAzul();

                                            SetHoraEntrada("--/--/---- --:--:--");
                                            SetHoraSalida("--/--/---- --:--:--");
                                            MakeReport("Ingrese la siguiente huella.");
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
                if (!seVerifico)
                {
                    MostrarRojo();
                    OcultarAzul();

                    Thread.Sleep(5000);

                    OcultarRojo();
                    MostrarAzul();

                    MakeReport("La huella no coincidie con ningún empleado.");
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
    }
}
