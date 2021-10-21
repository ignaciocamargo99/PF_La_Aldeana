﻿using System;
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

namespace desktop_employee.src.views.RegisterAssistance
{
    public partial class frmAssistanceFinger : CaptureForm
    {
        private DPFP.Template Template;
        private DPFP.Verification.Verification Verificator;
        private DataTable fingerPrintXEmployees;

        public DataTable FingerPrintXEmployees { get => fingerPrintXEmployees; set => fingerPrintXEmployees = value; }

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
            base.Text = "Verificación de Huella Digital";
            Verificator = new DPFP.Verification.Verification();     // Create a fingerprint template verificator
            UpdateStatus(0);

        }

        private void UpdateStatus(int FAR)
        {
            // Show "False accept rate" value
            SetStatus(String.Format("False Accept Rate (FAR) = {0}", FAR));
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
                for (int i = 0; i < fingerPrintXEmployees.Rows.Count; i++)
                {
                    if (fingerPrintXEmployees.Rows[i][3] != null)
                    {
                        stream = new MemoryStream((byte[])fingerPrintXEmployees.Rows[i][3]);
                        template = new DPFP.Template(stream);

                        Verificator.Verify(features, template, ref result);
                        UpdateStatus(result.FARAchieved);
                        if (result.Verified)
                        {
                            MakeReport("The fingerprint was VERIFIED. " + fingerPrintXEmployees.Rows[i][1] + " " + fingerPrintXEmployees.Rows[i][2]);
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
