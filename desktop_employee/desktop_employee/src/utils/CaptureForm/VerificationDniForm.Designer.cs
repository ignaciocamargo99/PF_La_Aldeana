namespace desktop_employee.src.utils.CaptureForm
{
    partial class VerificationDniForm
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
            this.panel1 = new System.Windows.Forms.Panel();
            this.StatusText = new System.Windows.Forms.TextBox();
            this.lblInfo = new System.Windows.Forms.Label();
            this.lblPromt = new System.Windows.Forms.Label();
            this.iconAceptado = new FontAwesome.Sharp.IconPictureBox();
            this.iconError = new FontAwesome.Sharp.IconPictureBox();
            this.lblHoraEntrada = new System.Windows.Forms.Label();
            this.lblHoraSalida = new System.Windows.Forms.Label();
            this.lblHoraE = new System.Windows.Forms.Label();
            this.lblHoraS = new System.Windows.Forms.Label();
            this.lblEmployee = new System.Windows.Forms.Label();
            this.iconEsperando = new FontAwesome.Sharp.IconPictureBox();
            this.btnRegistrarAsistencia = new desktop_employee.src.utils.Botones.CustomButton();
            this.txtDNI = new System.Windows.Forms.TextBox();
            this.lblDNI = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.iconAceptado)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconError)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconEsperando)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.WhiteSmoke;
            this.panel1.Controls.Add(this.StatusText);
            this.panel1.Controls.Add(this.lblInfo);
            this.panel1.Controls.Add(this.lblPromt);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(657, 192);
            this.panel1.TabIndex = 0;
            // 
            // StatusText
            // 
            this.StatusText.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.StatusText.BackColor = System.Drawing.SystemColors.Window;
            this.StatusText.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusText.Location = new System.Drawing.Point(29, 83);
            this.StatusText.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.StatusText.Multiline = true;
            this.StatusText.Name = "StatusText";
            this.StatusText.ReadOnly = true;
            this.StatusText.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.StatusText.Size = new System.Drawing.Size(599, 95);
            this.StatusText.TabIndex = 19;
            // 
            // lblInfo
            // 
            this.lblInfo.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblInfo.AutoSize = true;
            this.lblInfo.Font = new System.Drawing.Font("Abel", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblInfo.Location = new System.Drawing.Point(29, 49);
            this.lblInfo.Name = "lblInfo";
            this.lblInfo.Size = new System.Drawing.Size(48, 31);
            this.lblInfo.TabIndex = 18;
            this.lblInfo.Text = "Info";
            // 
            // lblPromt
            // 
            this.lblPromt.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblPromt.AutoSize = true;
            this.lblPromt.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblPromt.Location = new System.Drawing.Point(29, 14);
            this.lblPromt.Name = "lblPromt";
            this.lblPromt.Size = new System.Drawing.Size(56, 25);
            this.lblPromt.TabIndex = 17;
            this.lblPromt.Text = "Promt";
            // 
            // iconAceptado
            // 
            this.iconAceptado.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.iconAceptado.BackColor = System.Drawing.Color.White;
            this.iconAceptado.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.iconAceptado.IconChar = FontAwesome.Sharp.IconChar.CheckCircle;
            this.iconAceptado.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.iconAceptado.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.iconAceptado.IconSize = 200;
            this.iconAceptado.Location = new System.Drawing.Point(170, 302);
            this.iconAceptado.Name = "iconAceptado";
            this.iconAceptado.Size = new System.Drawing.Size(230, 200);
            this.iconAceptado.TabIndex = 73;
            this.iconAceptado.TabStop = false;
            this.iconAceptado.Visible = false;
            // 
            // iconError
            // 
            this.iconError.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.iconError.BackColor = System.Drawing.Color.White;
            this.iconError.ForeColor = System.Drawing.Color.Red;
            this.iconError.IconChar = FontAwesome.Sharp.IconChar.TimesCircle;
            this.iconError.IconColor = System.Drawing.Color.Red;
            this.iconError.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.iconError.IconSize = 200;
            this.iconError.Location = new System.Drawing.Point(175, 302);
            this.iconError.Name = "iconError";
            this.iconError.Size = new System.Drawing.Size(225, 200);
            this.iconError.TabIndex = 72;
            this.iconError.TabStop = false;
            this.iconError.Visible = false;
            // 
            // lblHoraEntrada
            // 
            this.lblHoraEntrada.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraEntrada.AutoSize = true;
            this.lblHoraEntrada.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraEntrada.Location = new System.Drawing.Point(7, 676);
            this.lblHoraEntrada.Name = "lblHoraEntrada";
            this.lblHoraEntrada.Size = new System.Drawing.Size(209, 44);
            this.lblHoraEntrada.TabIndex = 71;
            this.lblHoraEntrada.Text = "--/--/---- --:--:--";
            // 
            // lblHoraSalida
            // 
            this.lblHoraSalida.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraSalida.AutoSize = true;
            this.lblHoraSalida.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraSalida.Location = new System.Drawing.Point(415, 676);
            this.lblHoraSalida.Name = "lblHoraSalida";
            this.lblHoraSalida.Size = new System.Drawing.Size(209, 44);
            this.lblHoraSalida.TabIndex = 70;
            this.lblHoraSalida.Text = "--/--/---- --:--:--";
            // 
            // lblHoraE
            // 
            this.lblHoraE.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraE.AutoSize = true;
            this.lblHoraE.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraE.Location = new System.Drawing.Point(7, 601);
            this.lblHoraE.Name = "lblHoraE";
            this.lblHoraE.Size = new System.Drawing.Size(192, 44);
            this.lblHoraE.TabIndex = 68;
            this.lblHoraE.Text = "Hora Entrada";
            // 
            // lblHoraS
            // 
            this.lblHoraS.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraS.AutoSize = true;
            this.lblHoraS.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraS.Location = new System.Drawing.Point(415, 601);
            this.lblHoraS.Name = "lblHoraS";
            this.lblHoraS.Size = new System.Drawing.Size(170, 44);
            this.lblHoraS.TabIndex = 69;
            this.lblHoraS.Text = "Hora Salida";
            // 
            // lblEmployee
            // 
            this.lblEmployee.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblEmployee.AutoSize = true;
            this.lblEmployee.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblEmployee.Location = new System.Drawing.Point(154, 525);
            this.lblEmployee.Name = "lblEmployee";
            this.lblEmployee.Size = new System.Drawing.Size(260, 44);
            this.lblEmployee.TabIndex = 67;
            this.lblEmployee.Text = "Nombre Empleado";
            // 
            // iconEsperando
            // 
            this.iconEsperando.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.iconEsperando.BackColor = System.Drawing.Color.White;
            this.iconEsperando.ForeColor = System.Drawing.Color.Blue;
            this.iconEsperando.IconChar = FontAwesome.Sharp.IconChar.Clock;
            this.iconEsperando.IconColor = System.Drawing.Color.Blue;
            this.iconEsperando.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.iconEsperando.IconSize = 200;
            this.iconEsperando.Location = new System.Drawing.Point(175, 302);
            this.iconEsperando.Name = "iconEsperando";
            this.iconEsperando.Size = new System.Drawing.Size(229, 200);
            this.iconEsperando.TabIndex = 66;
            this.iconEsperando.TabStop = false;
            this.iconEsperando.Visible = false;
            // 
            // btnRegistrarAsistencia
            // 
            this.btnRegistrarAsistencia.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.btnRegistrarAsistencia.BackColor = System.Drawing.Color.White;
            this.btnRegistrarAsistencia.BackgroundColor = System.Drawing.Color.White;
            this.btnRegistrarAsistencia.BorderColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.BorderRadius = 25;
            this.btnRegistrarAsistencia.BorderSize = 1;
            this.btnRegistrarAsistencia.FlatAppearance.BorderSize = 0;
            this.btnRegistrarAsistencia.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnRegistrarAsistencia.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnRegistrarAsistencia.ForeColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.Location = new System.Drawing.Point(380, 220);
            this.btnRegistrarAsistencia.Name = "btnRegistrarAsistencia";
            this.btnRegistrarAsistencia.Size = new System.Drawing.Size(183, 48);
            this.btnRegistrarAsistencia.TabIndex = 65;
            this.btnRegistrarAsistencia.Text = "Registrar Asistencia";
            this.btnRegistrarAsistencia.TextColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.UseVisualStyleBackColor = false;
            // 
            // txtDNI
            // 
            this.txtDNI.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtDNI.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtDNI.Location = new System.Drawing.Point(154, 227);
            this.txtDNI.Name = "txtDNI";
            this.txtDNI.Size = new System.Drawing.Size(194, 32);
            this.txtDNI.TabIndex = 64;
            // 
            // lblDNI
            // 
            this.lblDNI.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lblDNI.AutoSize = true;
            this.lblDNI.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblDNI.Location = new System.Drawing.Point(96, 234);
            this.lblDNI.Name = "lblDNI";
            this.lblDNI.Size = new System.Drawing.Size(37, 25);
            this.lblDNI.TabIndex = 63;
            this.lblDNI.Text = "DNI";
            // 
            // VerificationDniForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(657, 767);
            this.Controls.Add(this.iconAceptado);
            this.Controls.Add(this.iconError);
            this.Controls.Add(this.lblHoraEntrada);
            this.Controls.Add(this.lblHoraSalida);
            this.Controls.Add(this.lblHoraE);
            this.Controls.Add(this.lblHoraS);
            this.Controls.Add(this.lblEmployee);
            this.Controls.Add(this.iconEsperando);
            this.Controls.Add(this.btnRegistrarAsistencia);
            this.Controls.Add(this.txtDNI);
            this.Controls.Add(this.lblDNI);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "VerificationDniForm";
            this.Text = "VerificationDniForm";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.iconAceptado)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconError)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconEsperando)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TextBox StatusText;
        private System.Windows.Forms.Label lblInfo;
        private System.Windows.Forms.Label lblPromt;
        private FontAwesome.Sharp.IconPictureBox iconAceptado;
        private FontAwesome.Sharp.IconPictureBox iconError;
        private System.Windows.Forms.Label lblHoraEntrada;
        private System.Windows.Forms.Label lblHoraSalida;
        private System.Windows.Forms.Label lblHoraE;
        private System.Windows.Forms.Label lblHoraS;
        private System.Windows.Forms.Label lblEmployee;
        private FontAwesome.Sharp.IconPictureBox iconEsperando;
        private Botones.CustomButton btnRegistrarAsistencia;
        private System.Windows.Forms.TextBox txtDNI;
        private System.Windows.Forms.Label lblDNI;
    }
}