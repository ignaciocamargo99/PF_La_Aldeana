using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace desktop_employee
{
    /* NOTE: This form is a base for the EnrollmentForm and the VerificationForm,
		All changes in the CaptureForm will be reflected in all its derived forms.
	*/
    delegate void Function1();

    public partial class VerificationForm : Form, DPFP.Capture.EventHandler
	{
		public VerificationForm()
		{
			InitializeComponent();
		}

		protected virtual void Init()
		{
			try
            {
                Capturer = new DPFP.Capture.Capture();				// Create a capture operation.

                if ( null != Capturer )
                    Capturer.EventHandler = this;					// Subscribe for capturing events.
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
			// Draw fingerprint sample image.
			DrawPicture(ConvertSampleToBitmap(Sample));
		}

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
			//MakeReport("La muestra ha sido capturada");
			ProcessAsync(Sample);
		}

		public void OnFingerGone(object Capture, string ReaderSerialNumber)
		{
			SetInfo("LISTO PARA COLOCAR DEDO");
			//MakeReport("La huella fue removida del lector");
		}

		public void OnFingerTouch(object Capture, string ReaderSerialNumber)
		{
			//MakeReport("El lector fue tocado");
		}

		public void OnReaderConnect(object Capture, string ReaderSerialNumber)
		{
			//SetInfo("EL LECTOR FUE CONECTADO");
			SetInfo("LISTO PARA COLOCAR DEDO");
			//MakeReport("El Lector de huellas ha sido conectado");
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

		//Borrar MakeReport
		protected void MakeReport(string message)
		{
			this.Invoke(new Function(delegate() {
				StatusText.AppendText(message + "\r\n");
			}));
		}

		protected void SetEmployee(string nameSurname)
        {
			this.Invoke(new Function(delegate () {
				lblEmployee.Text = nameSurname;
			}));
		}

		protected void SetHoraEntrada(string horaEntrada)
		{
			this.Invoke(new Function(delegate () {
				lblHoraEntrada.Text = horaEntrada;
			}));
		}

		protected void SetHoraSalida(string horaSalida)
		{
			this.Invoke(new Function(delegate () {
				lblHoraSalida.Text = horaSalida;
			}));
		}

		protected void SetInfo(string info)
		{
			this.Invoke(new Function(delegate () {
				lblInfo.Text = info;
			}));
		}

		protected void MostrarAzul()
		{
			this.Invoke(new Function(delegate () {
				iconEsperando.Visible = true;
			}));
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
			this.Invoke(new Function(delegate () {
				iconAceptado.Visible = false;
			}));
		}

		protected void MostrarRojo()
		{
			this.Invoke(new Function(delegate () {
				iconError.Visible = true;
			}));
		}

		protected void OcultarRojo()
		{
			this.Invoke(new Function(delegate () {
				iconError.Visible = false;
			}));
		}

		private void DrawPicture(Bitmap bitmap)
		{
			this.Invoke(new Function(delegate() {
				Picture.Image = new Bitmap(bitmap, Picture.Size);	// fit the image into the picture box
			}));
		}

		private DPFP.Capture.Capture Capturer;


    }
}