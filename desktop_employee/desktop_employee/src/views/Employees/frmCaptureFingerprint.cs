using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace desktop_employee.src.views.Employees
{
    public partial class frmCaptureFingerPrint : CaptureForm
    {
        public delegate void OnTemplateEventHandler(DPFP.Template template);
        public event OnTemplateEventHandler OnTemplate;
        private DPFP.Processing.Enrollment Enroller;

        public frmCaptureFingerPrint()
        {
            InitializeComponent();
        }

        protected override void Init()
        {
            base.Init();
            base.Text = "Dar de alta Huella";
            Enroller = new DPFP.Processing.Enrollment();            // Create an enrollment.
            UpdateStatus();
        }

        private void UpdateStatus()
        {
            // Show number of samples needed.
            if (Enroller.FeaturesNeeded > 0)
            {
                SetStatus(String.Format("Se necesitan {0} muestras de huellas dactilares", Enroller.FeaturesNeeded));
            }
            else
            {
                SetStatus(String.Format("Huella Capturada correctamente. Ya puede cerrar la ventana."));

                //cambiar color boton y activarlo
                ValidarBotonAceptar();
            }
            
        }

        protected override void Process(DPFP.Sample Sample)
        {
            base.Process(Sample);

            // Process the sample and create a feature set for the enrollment purpose.
            DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Enrollment);

            // Check quality of the sample and add to enroller if it's good
            if (features != null) try
                {
                    MakeReport("La muestra de la huella se creo correctamente.");
                    Enroller.AddFeatures(features);     // Add feature set to template.
                }
                finally
                {
                    UpdateStatus();

                    // Check if template has been created.
                    switch (Enroller.TemplateStatus)
                    {
                        case DPFP.Processing.Enrollment.Status.Ready:   // report success and stop capturing
                            OnTemplate(Enroller.Template);
                            Stop();
                            break;

                        case DPFP.Processing.Enrollment.Status.Failed:  // report failure and restart capturing
                            Enroller.Clear();
                            Stop();
                            UpdateStatus();
                            OnTemplate(null);
                            Start();
                            break;
                    }
                }
        }
    }
}
