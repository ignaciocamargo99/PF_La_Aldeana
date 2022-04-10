using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace desktop_employee
{
    delegate void Function1();

    public partial class VerificationForm : Form, DPFP.Capture.EventHandler
	{
		bool activo = true;
		public VerificationForm()
		{
			InitializeComponent();
		}

		protected virtual void Init()
		{
			try
            {
                Capturer = new DPFP.Capture.Capture();		
                if ( null != Capturer )
                    Capturer.EventHandler = this;			
                else
                    SetPrompt("No se pudo iniciar la operación de captura. REINICIE LA APLICACIÓN.");
            }
            catch
            {               
                MessageBox.Show("No se pudo iniciar la operación de captura", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);   
            }
		}

		protected virtual void ProcessAsync(DPFP.Sample Sample)
		{
			DrawPicture(ConvertSampleToBitmap(Sample));
		}

		protected virtual void ProcessDNIAsync(string dniÉmpleado)
        {}

		protected void Start()
		{
            if (null != Capturer)
            {
                try
                {
                    Capturer.StartCapture();
					SetInfo("LISTO PARA COLOCAR DEDO");
                    SetPrompt("Coloca el dedo sobre el lector para marcar la asistencia.");
					MostrarAzul();
                }
                catch
                {
                    SetPrompt("No se puede registrar la asistencia. Revise si esta conectado el lector.");
                }
            }
		}

		protected void Stop()
		{
            if (null != Capturer)
            {
                try
                {
                    Capturer.StopCapture();
                }
                catch
                {
                    SetPrompt("No se puede terminar la captura. REINICIE LA APLICACIÓN.");
                }
            }
		}
		
	#region Form Event Handlers:

		private void CaptureForm_Load(object sender, EventArgs e)
		{
			Init();
			Start();												// Start capture operation.
		}

		private void CaptureForm_FormClosed(object sender, FormClosedEventArgs e)
		{
			Stop();
		}
	#endregion

	#region EventHandler Members:

		public void OnComplete(object Capture, string ReaderSerialNumber, DPFP.Sample Sample)
		{
			SetInfo("LA HUELLA FUE CAPTURADA");
			ProcessAsync(Sample);
		}

		public void OnFingerGone(object Capture, string ReaderSerialNumber)
		{
		}

		public void OnFingerTouch(object Capture, string ReaderSerialNumber)
		{
		}

		public void OnReaderConnect(object Capture, string ReaderSerialNumber)
		{
			SetInfo("LISTO PARA COLOCAR DEDO");
		}

		public void OnReaderDisconnect(object Capture, string ReaderSerialNumber)
		{
			SetInfo("EL LECTOR FUE DESCONECTADO");
			MakeReport("El Lector de huellas ha sido desconectado");
		}
		
		public void OnSampleQuality(object Capture, string ReaderSerialNumber, DPFP.Capture.CaptureFeedback CaptureFeedback)
		{
			if (CaptureFeedback == DPFP.Capture.CaptureFeedback.Good)
				MakeReport("La calidad de la muestra es BUENA");
			else
				MakeReport("La calidad de la muestra es MALA");
		}
		
	#endregion

		protected Bitmap ConvertSampleToBitmap(DPFP.Sample Sample)
		{
			DPFP.Capture.SampleConversion Convertor = new DPFP.Capture.SampleConversion();	// Create a sample convertor.
			Bitmap bitmap = null;												            // TODO: the size doesn't matter
			Convertor.ConvertToPicture(Sample, ref bitmap);									// TODO: return bitmap as a result
			return bitmap;
		}

		protected DPFP.FeatureSet ExtractFeatures(DPFP.Sample Sample, DPFP.Processing.DataPurpose Purpose)
		{
			DPFP.Processing.FeatureExtraction Extractor = new DPFP.Processing.FeatureExtraction();	// Create a feature extractor
			DPFP.Capture.CaptureFeedback feedback = DPFP.Capture.CaptureFeedback.None;
			DPFP.FeatureSet features = new DPFP.FeatureSet();
			Extractor.CreateFeatureSet(Sample, Purpose, ref feedback, ref features);			// TODO: return features as a result?
			if (feedback == DPFP.Capture.CaptureFeedback.Good)
				return features;
			else
				return null;
		}

		protected void SetPrompt(string prompt)
		{
			this.Invoke(new Function(delegate() {
				lblPromt.Text = prompt;
			}));
		}

		protected void MakeReport(string message)
		{
			if (activo)
            {
				this.Invoke(new Function(delegate () {
					StatusText.AppendText(message + "\r\n");
				}));
			}
		}

		protected void SetEmployee(string nameSurname)
        {
			if (activo)
			{
				this.Invoke(new Function(delegate () {
					lblEmployee.Text = nameSurname;
				}));
			}
		}

		protected void SetHoraEntrada(string horaEntrada)
		{
			if (activo)
            {
				this.Invoke(new Function(delegate () {
					lblHoraEntrada.Text = horaEntrada;
				}));
			}
		}

		protected void SetHoraSalida(string horaSalida)
		{
			if (activo)
			{
				this.Invoke(new Function(delegate () {
					lblHoraSalida.Text = horaSalida;
				}));
			}
		}

		protected void SetInfo(string info)
		{
			if (activo)
            {
				this.Invoke(new Function(delegate () {
					lblInfo.Text = info;
				}));
			}
		}

		protected void MostrarAzul()
		{
			if (activo)
            {
				this.Invoke(new Function(delegate () {
					iconEsperando.Visible = true;
				}));
			}
		}

		protected void OcultarAzul()
		{
			this.Invoke(new Function(delegate () {
				iconEsperando.Visible = false;
			}));
		}

		protected void MostrarVerde()
		{
			this.Invoke(new Function(delegate () {
				iconAceptado.Visible = true;
			}));
		}

		protected void OcultarVerde()
		{
			if (activo)
			{
				this.Invoke(new Function(delegate () {
					iconAceptado.Visible = false;
				}));
			}
		}

		protected void MostrarRojo()
		{
			this.Invoke(new Function(delegate () {
				iconError.Visible = true;
			}));
		}

		protected void OcultarRojo()
		{
			if (activo)
            {
				this.Invoke(new Function(delegate () {
					iconError.Visible = false;
				}));
			}
		}

		private void DrawPicture(Bitmap bitmap)
		{
			this.Invoke(new Function(delegate() {
				Picture.Image = new Bitmap(bitmap, Picture.Size);
			}));
		}

		protected void CleanPicture()
		{
			if (activo)
            {
				this.Invoke(new Function(delegate () {
					Picture.Image = null;
				}));
			}
		}
		
		protected void focusTxtDNI()
		{
			this.Invoke(new Function(delegate () {
				txtDNI.Focus();
			}));
			
		}

		protected void cleanTxtDNI()
		{
			this.Invoke(new Function(delegate () {
				txtDNI.Text = "";
				txtDNI.Focus();
			}));

		}

		private DPFP.Capture.Capture Capturer;

        private void VerificationForm_FormClosing(object sender, FormClosingEventArgs e)
        {
			activo = false;
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

        private void btnRegistrarAsistencia_Click(object sender, EventArgs e)
        {
			ProcessDNIAsync(Convert.ToString(txtDNI.Text));
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