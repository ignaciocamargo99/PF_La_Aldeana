
namespace desktop_employee.src.views.RegisterAssistance
{
    partial class frmRegisterAssistence
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnAssistanceFinger = new System.Windows.Forms.Button();
            this.btnAssistanceDni = new System.Windows.Forms.Button();
            this.dgvConvert = new System.Windows.Forms.DataGridView();
            ((System.ComponentModel.ISupportInitialize)(this.dgvConvert)).BeginInit();
            this.SuspendLayout();
            // 
            // btnAssistanceFinger
            // 
            this.btnAssistanceFinger.Location = new System.Drawing.Point(238, 42);
            this.btnAssistanceFinger.Name = "btnAssistanceFinger";
            this.btnAssistanceFinger.Size = new System.Drawing.Size(113, 57);
            this.btnAssistanceFinger.TabIndex = 0;
            this.btnAssistanceFinger.Text = "Asistencia con Huella";
            this.btnAssistanceFinger.UseVisualStyleBackColor = true;
            this.btnAssistanceFinger.Click += new System.EventHandler(this.btnAssistanceFinger_Click);
            // 
            // btnAssistanceDni
            // 
            this.btnAssistanceDni.Location = new System.Drawing.Point(437, 42);
            this.btnAssistanceDni.Name = "btnAssistanceDni";
            this.btnAssistanceDni.Size = new System.Drawing.Size(113, 57);
            this.btnAssistanceDni.TabIndex = 1;
            this.btnAssistanceDni.Text = "Asistencia con DNI";
            this.btnAssistanceDni.UseVisualStyleBackColor = true;
            this.btnAssistanceDni.Click += new System.EventHandler(this.btnAssistanceDni_Click);
            // 
            // dgvConvert
            // 
            this.dgvConvert.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvConvert.Location = new System.Drawing.Point(165, 177);
            this.dgvConvert.Name = "dgvConvert";
            this.dgvConvert.RowTemplate.Height = 25;
            this.dgvConvert.Size = new System.Drawing.Size(548, 220);
            this.dgvConvert.TabIndex = 2;
            // 
            // frmRegisterAssistence
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.dgvConvert);
            this.Controls.Add(this.btnAssistanceDni);
            this.Controls.Add(this.btnAssistanceFinger);
            this.Name = "frmRegisterAssistence";
            this.Text = "frmRegisterAssistence";
            this.Load += new System.EventHandler(this.frmRegisterAssistence_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dgvConvert)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnAssistanceFinger;
        private System.Windows.Forms.Button btnAssistanceDni;
        private System.Windows.Forms.DataGridView dgvConvert;
    }
}