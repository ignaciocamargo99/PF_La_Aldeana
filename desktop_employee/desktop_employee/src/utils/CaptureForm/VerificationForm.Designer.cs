namespace desktop_employee
{
    partial class VerificationForm
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
            this.Picture = new System.Windows.Forms.PictureBox();
            this.StatusText = new System.Windows.Forms.TextBox();
            this.iconEsperando = new FontAwesome.Sharp.IconPictureBox();
            this.iconAceptado = new FontAwesome.Sharp.IconPictureBox();
            this.iconError = new FontAwesome.Sharp.IconPictureBox();
            this.lblEmployee = new System.Windows.Forms.Label();
            this.lblHoraE = new System.Windows.Forms.Label();
            this.lblHoraS = new System.Windows.Forms.Label();
            this.lblHoraEntrada = new System.Windows.Forms.Label();
            this.lblHoraSalida = new System.Windows.Forms.Label();
            this.lblPromt = new System.Windows.Forms.Label();
            this.lblInfo = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.Picture)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconEsperando)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconAceptado)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconError)).BeginInit();
            this.SuspendLayout();
            // 
            // Picture
            // 
            this.Picture.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.Picture.BackColor = System.Drawing.SystemColors.Window;
            this.Picture.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.Picture.Location = new System.Drawing.Point(14, 14);
            this.Picture.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.Picture.Name = "Picture";
            this.Picture.Size = new System.Drawing.Size(289, 332);
            this.Picture.TabIndex = 0;
            this.Picture.TabStop = false;
            // 
            // StatusText
            // 
            this.StatusText.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.StatusText.BackColor = System.Drawing.SystemColors.Window;
            this.StatusText.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusText.Location = new System.Drawing.Point(314, 93);
            this.StatusText.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.StatusText.Multiline = true;
            this.StatusText.Name = "StatusText";
            this.StatusText.ReadOnly = true;
            this.StatusText.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.StatusText.Size = new System.Drawing.Size(349, 59);
            this.StatusText.TabIndex = 4;
            // 
            // iconEsperando
            // 
            this.iconEsperando.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.iconEsperando.BackColor = System.Drawing.SystemColors.Control;
            this.iconEsperando.ForeColor = System.Drawing.Color.Blue;
            this.iconEsperando.IconChar = FontAwesome.Sharp.IconChar.Clock;
            this.iconEsperando.IconColor = System.Drawing.Color.Blue;
            this.iconEsperando.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.iconEsperando.IconSize = 68;
            this.iconEsperando.Location = new System.Drawing.Point(354, 174);
            this.iconEsperando.Name = "iconEsperando";
            this.iconEsperando.Size = new System.Drawing.Size(68, 68);
            this.iconEsperando.TabIndex = 5;
            this.iconEsperando.TabStop = false;
            this.iconEsperando.Visible = false;
            // 
            // iconAceptado
            // 
            this.iconAceptado.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.iconAceptado.BackColor = System.Drawing.SystemColors.Control;
            this.iconAceptado.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.iconAceptado.IconChar = FontAwesome.Sharp.IconChar.CheckCircle;
            this.iconAceptado.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.iconAceptado.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.iconAceptado.IconSize = 69;
            this.iconAceptado.Location = new System.Drawing.Point(443, 174);
            this.iconAceptado.Name = "iconAceptado";
            this.iconAceptado.Size = new System.Drawing.Size(75, 69);
            this.iconAceptado.TabIndex = 6;
            this.iconAceptado.TabStop = false;
            this.iconAceptado.Visible = false;
            // 
            // iconError
            // 
            this.iconError.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.iconError.BackColor = System.Drawing.SystemColors.Control;
            this.iconError.ForeColor = System.Drawing.Color.Red;
            this.iconError.IconChar = FontAwesome.Sharp.IconChar.TimesCircle;
            this.iconError.IconColor = System.Drawing.Color.Red;
            this.iconError.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.iconError.IconSize = 63;
            this.iconError.Location = new System.Drawing.Point(545, 176);
            this.iconError.Name = "iconError";
            this.iconError.Size = new System.Drawing.Size(63, 75);
            this.iconError.TabIndex = 7;
            this.iconError.TabStop = false;
            this.iconError.Visible = false;
            // 
            // lblEmployee
            // 
            this.lblEmployee.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblEmployee.AutoSize = true;
            this.lblEmployee.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblEmployee.Location = new System.Drawing.Point(428, 274);
            this.lblEmployee.Name = "lblEmployee";
            this.lblEmployee.Size = new System.Drawing.Size(118, 21);
            this.lblEmployee.TabIndex = 8;
            this.lblEmployee.Text = "Nombre Empleado";
            // 
            // lblHoraE
            // 
            this.lblHoraE.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblHoraE.AutoSize = true;
            this.lblHoraE.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraE.Location = new System.Drawing.Point(356, 318);
            this.lblHoraE.Name = "lblHoraE";
            this.lblHoraE.Size = new System.Drawing.Size(89, 21);
            this.lblHoraE.TabIndex = 9;
            this.lblHoraE.Text = "Hora Entrada";
            // 
            // lblHoraS
            // 
            this.lblHoraS.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblHoraS.AutoSize = true;
            this.lblHoraS.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraS.Location = new System.Drawing.Point(530, 316);
            this.lblHoraS.Name = "lblHoraS";
            this.lblHoraS.Size = new System.Drawing.Size(79, 21);
            this.lblHoraS.TabIndex = 10;
            this.lblHoraS.Text = "Hora Salida";
            // 
            // lblHoraEntrada
            // 
            this.lblHoraEntrada.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblHoraEntrada.AutoSize = true;
            this.lblHoraEntrada.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraEntrada.Location = new System.Drawing.Point(366, 358);
            this.lblHoraEntrada.Name = "lblHoraEntrada";
            this.lblHoraEntrada.Size = new System.Drawing.Size(102, 21);
            this.lblHoraEntrada.TabIndex = 11;
            this.lblHoraEntrada.Text = "--/--/---- --:--:--";
            // 
            // lblHoraSalida
            // 
            this.lblHoraSalida.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblHoraSalida.AutoSize = true;
            this.lblHoraSalida.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraSalida.Location = new System.Drawing.Point(553, 351);
            this.lblHoraSalida.Name = "lblHoraSalida";
            this.lblHoraSalida.Size = new System.Drawing.Size(102, 21);
            this.lblHoraSalida.TabIndex = 12;
            this.lblHoraSalida.Text = "--/--/---- --:--:--";
            // 
            // lblPromt
            // 
            this.lblPromt.AutoSize = true;
            this.lblPromt.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblPromt.Location = new System.Drawing.Point(443, 23);
            this.lblPromt.Name = "lblPromt";
            this.lblPromt.Size = new System.Drawing.Size(47, 21);
            this.lblPromt.TabIndex = 13;
            this.lblPromt.Text = "Promt";
            // 
            // lblInfo
            // 
            this.lblInfo.AutoSize = true;
            this.lblInfo.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblInfo.Location = new System.Drawing.Point(457, 69);
            this.lblInfo.Name = "lblInfo";
            this.lblInfo.Size = new System.Drawing.Size(33, 21);
            this.lblInfo.TabIndex = 14;
            this.lblInfo.Text = "Info";
            // 
            // VerificationForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(678, 408);
            this.Controls.Add(this.lblInfo);
            this.Controls.Add(this.lblPromt);
            this.Controls.Add(this.lblHoraSalida);
            this.Controls.Add(this.lblHoraEntrada);
            this.Controls.Add(this.lblHoraS);
            this.Controls.Add(this.lblHoraE);
            this.Controls.Add(this.lblEmployee);
            this.Controls.Add(this.iconError);
            this.Controls.Add(this.iconAceptado);
            this.Controls.Add(this.iconEsperando);
            this.Controls.Add(this.StatusText);
            this.Controls.Add(this.Picture);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.MinimumSize = new System.Drawing.Size(464, 340);
            this.Name = "VerificationForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Capture Enrollment";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.CaptureForm_FormClosed);
            this.Load += new System.EventHandler(this.CaptureForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.Picture)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconEsperando)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconAceptado)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconError)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox Picture;
        private System.Windows.Forms.TextBox StatusText;
        private FontAwesome.Sharp.IconPictureBox iconEsperando;
        private FontAwesome.Sharp.IconPictureBox iconAceptado;
        private FontAwesome.Sharp.IconPictureBox iconError;
        private System.Windows.Forms.Label lblEmployee;
        private System.Windows.Forms.Label lblHoraE;
        private System.Windows.Forms.Label lblHoraS;
        private System.Windows.Forms.Label lblHoraEntrada;
        private System.Windows.Forms.Label lblHoraSalida;
        private System.Windows.Forms.Label lblPromt;
        private System.Windows.Forms.Label lblInfo;
    }
}