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

namespace desktop_employee.src.views.Employees
{
    public partial class frmValidationFingerprint : ValidationForm
    {
        private DPFP.Template Template;
        private DPFP.Verification.Verification Verificator;
        private dynamic huellasEmpleado;
        private string huellaAcomparar;
        bool seVerifico = false;
        public frmValidationFingerprint()
        {
            InitializeComponent();
        }

        public dynamic HuellasEmpleado { get => huellasEmpleado; set => huellasEmpleado = value; }
        public string HuellaAcomparar { get => huellaAcomparar; set => huellaAcomparar = value; }

        public void Verify(DPFP.Template template)
        {
            Template = template;
            ShowDialog();
        }

        protected override void Init()
        {
            base.Init();
            Verificator = new DPFP.Verification.Verification();
        }

        protected override void Process(DPFP.Sample Sample)
        {
            base.Process(Sample);
            DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);

            if (features != null)
            {
                DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();
                DPFP.Template template = new DPFP.Template();
                Stream stream;

                for (int i = 0; i < huellasEmpleado.Count; i++)
                {
                    if (huellasEmpleado[i].finger_print != null)
                    {
                        stream = new MemoryStream((byte[])huellasEmpleado[i].finger_print);
                        template = new DPFP.Template(stream);

                        Verificator.Verify(features, template, ref result);
                        if (result.Verified)
                        {
                            if (huellasEmpleado[i].finger == huellaAcomparar)
                            {
                                seVerifico = true;
                                break;
                            }
                        }
                    }
                }

                if (seVerifico)
                {
                    MostrarVerde();
                    OcultarRojo();
                    SetInfo("La huella coincide.");
                }
                else
                {
                    MostrarRojo();
                    OcultarVerde();
                    SetInfo("La huella NO coincide. Vuelva a intentarlo.");

                    /// agregar timmer y volver a ingresar
                }

            }
        }

    }
}
