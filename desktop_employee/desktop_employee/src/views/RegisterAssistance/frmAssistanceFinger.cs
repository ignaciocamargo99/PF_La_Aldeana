using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using desktop_employee.src.entities;
using desktop_employee.src.views.Employees;

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmAssistanceFinger : VerificationForm
    {
        private DPFP.Template Template;
        private DPFP.Verification.Verification Verificator;

        private DataTable fingerXEmployees;
        public DataTable FingerXEmployees { get => fingerXEmployees; set => fingerXEmployees = value; }

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
            Verificator = new DPFP.Verification.Verification();     // Create a fingerprint template verificator

        }


        protected override void Process(DPFP.Sample Sample)
        {
            base.Process(Sample);

            // Process the sample and create a feature set for the enrollment purpose.
            DPFP.FeatureSet features = ExtractFeatures(Sample, DPFP.Processing.DataPurpose.Verification);

            // Check quality of the sample and start verification if it's good
            // TODO: move to a separate task

            if (features != null)
            {
                // Compare the feature set with our template
                DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();

                DPFP.Template template = new DPFP.Template();
                Stream stream;
                for (int i = 0; i < FingerXEmployees.Rows.Count; i++)
                {
                    if (FingerXEmployees.Rows[i][3] != null)
                    {
                        stream = new MemoryStream((byte[])FingerXEmployees.Rows[i][3]);
                        template = new DPFP.Template(stream);

                        Verificator.Verify(features, template, ref result);
                        if (result.Verified)
                        {
                            string nameEmployee = FingerXEmployees.Rows[i][1] + " " + FingerXEmployees.Rows[i][2];
                            MakeReport("The fingerprint was VERIFIED. " + nameEmployee);
                            SetEmployee(nameEmployee);
                            break;
                        }
                        else
                        {
                            MakeReport("The fingerprint no se verifico. ");
                        }
                    }
                }
            }
        }


    }
}
