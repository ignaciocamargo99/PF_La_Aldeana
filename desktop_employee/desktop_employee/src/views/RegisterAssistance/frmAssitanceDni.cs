using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.Net;
using System.IO;
using desktop_employee.src.entities;

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmAssitanceDni : Form
    {
		Reply oReply = new Reply();
		dynamic datosAsistencias;
		dynamic datosEmpleados;
		DataTable ultimosRegistros;
		config config = new();
		bool tenemosDatosEmpleados = true;
		bool hayRegistros = true;
		bool seVerifico;
		bool esRepetido;

		public frmAssitanceDni()
        {
            InitializeComponent();
        }

        private void txtDNI_TextChanged(object sender, EventArgs e)
        {
			//controlamos la longitud del dni
			var dniEmpleado = txtDNI.Text.Replace(" ", string.Empty);
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

		private void focusTxtDNI()
		{
			txtDNI.Focus();
		}

		private void cleanTxtDNI()
		{
			txtDNI.Text = "";
			txtDNI.Focus();
		}

		private async void btnRegistrarAsistencia_Click(object sender, EventArgs e)
        {
			if (!tenemosDatosEmpleados)
            {
				MessageBox.Show("PROBLEMA EN EL SERVIDOR. Reinicie la aplicación", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);	
				return;
            }
			seVerifico = false;
			esRepetido = false;
			for (int i = 0; i < datosEmpleados.Count; i++)
			{
				if (Convert.ToInt32(datosEmpleados[i].DNI) == Convert.ToInt32(txtDNI.Text.Replace(" ", string.Empty)))
				{
					StatusText.AppendText(getHoraActual() + "El DNI ingresado es de " + datosEmpleados[i].NOMBRE + " " + datosEmpleados[i].APELLIDO + ".\r\n");
					borrarRegistrosViejos();
					if (empleadoRepetido(Convert.ToInt32(datosEmpleados[i].DNI)))
                    {
						StatusText.AppendText(getHoraActual() + "El DNI fue ingresado en los últimos 5 minutos. Reintente con otro DNI." + "\r\n");
						StatusText.AppendText(getHoraActual() + "Listo para ingresar DNI." + "\r\n");
						esRepetido = true;
						break;
					}
					else
					{
						seVerifico = true;
						DateTime timeInOut = DateTime.Now;
						string timeInOutFormated = convertDateTimeToString(timeInOut);

						CheckAsistencia checkAsistencia = new()
						{
							datetime = timeInOutFormated
						};
						oReply = await Consumer.Execute<CheckAsistencia>(config.getUrlPort() + "/api/assistenceFinger/" + Convert.ToString(datosEmpleados[i].DNI), methodHttp.POST, checkAsistencia);

						if (oReply.StatusCode == "OK")
                        {
							cargarRegistros(Convert.ToInt32(datosEmpleados[i].DNI), timeInOut);
							StatusText.AppendText(getHoraActual() + "Se registro correctamente." + "\r\n");	
							cargarTabla();
							
						}
						else
                        {
							StatusText.AppendText(getHoraActual() + "Se produjo un error. Reintente de nuevo." + "\r\n");
						}
						StatusText.AppendText(getHoraActual() + "Listo para ingresar DNI." + "\r\n");
						break;
					}
				}                
			}
			if (!seVerifico && !esRepetido)
			{
				StatusText.AppendText(getHoraActual() + "El DNI no coincidie con ningún empleado." + "\r\n");
				StatusText.AppendText(getHoraActual() + "Listo para ingresar DNI." + "\r\n");
			}
			cleanTxtDNI();
			focusTxtDNI();
		}

        private void frmAssitanceDni_Load(object sender, EventArgs e)
        {
			var urlGet2 = config.getUrlPort() + "/api/employeesDesktop";
			var requestGet = (HttpWebRequest)WebRequest.Create(urlGet2);
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
							datosEmpleados = JsonConvert.DeserializeObject(responseBody);
							StatusText.AppendText(getHoraActual() + "Listo para ingresar DNI." + "\r\n");
						}
					}
				}
			}
			catch (WebException ex)
			{
				tenemosDatosEmpleados = false;
				StatusText.AppendText(getHoraActual() + "No se puede ingresar el DNI. REINICIE LA APLICACIÓN." + "\r\n");
			}
			cargarTabla();
			ultimosRegistros = crearTablaRegistros();
			focusTxtDNI();
		}

		private void cargarTabla()
        {
			var urlGet = config.getUrlPort() + "/api/assistanceDay";
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
							datosAsistencias = JsonConvert.DeserializeObject(responseBody);
							hayRegistros = true;
						}
					}
				}
			}
			catch (WebException ex)
			{
				hayRegistros = false;
			}
			if (!hayRegistros) return;
			if (datosAsistencias.Count > 0)
            {
				dgvAssistance.DataSource = datosAsistencias;
				dgvAssistance.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
				dgvAssistance.Columns[2].HeaderText = "HORA DE ENTRADA";
				dgvAssistance.Columns[3].HeaderText = "HORA DE SALIDA";
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

		private string convertDateTimeToString(DateTime datetime)
		{
			string timeInOut = Convert.ToString(datetime.Year) + "-" + Convert.ToString(datetime.Month) + "-" +
				Convert.ToString(datetime.Day) + " " + Convert.ToString(datetime.Hour) + ":" +
				Convert.ToString(datetime.Minute) + ":" + Convert.ToString(datetime.Second);
			return timeInOut;
		}

		private string getHoraActual()
        {
			var hora = DateTime.Now.ToString("hh:mm:ss tt");
			hora = hora + "  --  ";
			return hora;
		}
	}
}
