namespace desktop_employee.src.views.RegisterAssistance
{
    partial class frmAssitanceDni
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            this.btnRegistrarAsistencia = new desktop_employee.src.utils.Botones.CustomButton();
            this.txtDNI = new System.Windows.Forms.TextBox();
            this.lblDNI = new System.Windows.Forms.Label();
            this.dgvAssistance = new System.Windows.Forms.DataGridView();
            this.StatusText = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.dgvAssistance)).BeginInit();
            this.SuspendLayout();
            // 
            // btnRegistrarAsistencia
            // 
            this.btnRegistrarAsistencia.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.btnRegistrarAsistencia.AutoSize = true;
            this.btnRegistrarAsistencia.BackColor = System.Drawing.Color.White;
            this.btnRegistrarAsistencia.BackgroundColor = System.Drawing.Color.White;
            this.btnRegistrarAsistencia.BorderColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.BorderRadius = 25;
            this.btnRegistrarAsistencia.BorderSize = 1;
            this.btnRegistrarAsistencia.Enabled = false;
            this.btnRegistrarAsistencia.FlatAppearance.BorderSize = 0;
            this.btnRegistrarAsistencia.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRegistrarAsistencia.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnRegistrarAsistencia.ForeColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.Location = new System.Drawing.Point(575, 41);
            this.btnRegistrarAsistencia.Name = "btnRegistrarAsistencia";
            this.btnRegistrarAsistencia.Size = new System.Drawing.Size(183, 48);
            this.btnRegistrarAsistencia.TabIndex = 59;
            this.btnRegistrarAsistencia.Text = "Registrar Asistencia";
            this.btnRegistrarAsistencia.TextColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.UseVisualStyleBackColor = false;
            this.btnRegistrarAsistencia.Click += new System.EventHandler(this.btnRegistrarAsistencia_Click);
            // 
            // txtDNI
            // 
            this.txtDNI.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtDNI.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtDNI.Location = new System.Drawing.Point(349, 48);
            this.txtDNI.Name = "txtDNI";
            this.txtDNI.Size = new System.Drawing.Size(194, 32);
            this.txtDNI.TabIndex = 58;
            this.txtDNI.TextChanged += new System.EventHandler(this.txtDNI_TextChanged);
            this.txtDNI.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtDNI_KeyPress);
            // 
            // lblDNI
            // 
            this.lblDNI.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lblDNI.AutoSize = true;
            this.lblDNI.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblDNI.Location = new System.Drawing.Point(283, 54);
            this.lblDNI.Name = "lblDNI";
            this.lblDNI.Size = new System.Drawing.Size(37, 25);
            this.lblDNI.TabIndex = 57;
            this.lblDNI.Text = "DNI";
            // 
            // dgvAssistance
            // 
            this.dgvAssistance.AllowUserToAddRows = false;
            this.dgvAssistance.AllowUserToDeleteRows = false;
            this.dgvAssistance.AllowUserToResizeColumns = false;
            this.dgvAssistance.AllowUserToResizeRows = false;
            this.dgvAssistance.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
            dataGridViewCellStyle1.BackColor = System.Drawing.SystemColors.Control;
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Abel", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            dataGridViewCellStyle1.ForeColor = System.Drawing.SystemColors.WindowText;
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dgvAssistance.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.dgvAssistance.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleCenter;
            dataGridViewCellStyle2.BackColor = System.Drawing.SystemColors.Window;
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            dataGridViewCellStyle2.ForeColor = System.Drawing.SystemColors.ControlText;
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dgvAssistance.DefaultCellStyle = dataGridViewCellStyle2;
            this.dgvAssistance.Location = new System.Drawing.Point(30, 287);
            this.dgvAssistance.MultiSelect = false;
            this.dgvAssistance.Name = "dgvAssistance";
            this.dgvAssistance.ReadOnly = true;
            this.dgvAssistance.RowTemplate.Height = 25;
            this.dgvAssistance.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgvAssistance.Size = new System.Drawing.Size(975, 448);
            this.dgvAssistance.TabIndex = 61;
            // 
            // StatusText
            // 
            this.StatusText.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.StatusText.BackColor = System.Drawing.SystemColors.Window;
            this.StatusText.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusText.Location = new System.Drawing.Point(30, 124);
            this.StatusText.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.StatusText.Multiline = true;
            this.StatusText.Name = "StatusText";
            this.StatusText.ReadOnly = true;
            this.StatusText.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.StatusText.Size = new System.Drawing.Size(975, 143);
            this.StatusText.TabIndex = 63;
            // 
            // frmAssitanceDni
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(1035, 767);
            this.Controls.Add(this.StatusText);
            this.Controls.Add(this.dgvAssistance);
            this.Controls.Add(this.btnRegistrarAsistencia);
            this.Controls.Add(this.txtDNI);
            this.Controls.Add(this.lblDNI);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmAssitanceDni";
            this.Text = "frmAssitanceDni";
            this.Load += new System.EventHandler(this.frmAssitanceDni_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dgvAssistance)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private utils.Botones.CustomButton btnRegistrarAsistencia;
        private System.Windows.Forms.TextBox txtDNI;
        private System.Windows.Forms.Label lblDNI;
        private System.Windows.Forms.DataGridView dgvAssistance;
        private System.Windows.Forms.TextBox StatusText;
    }
}