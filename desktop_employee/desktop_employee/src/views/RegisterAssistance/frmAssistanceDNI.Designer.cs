
namespace desktop_employee.src.views.RegisterAssistance
{
    partial class frmAssistanceDNI
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
            this.panel2 = new System.Windows.Forms.Panel();
            this.lblPromt = new System.Windows.Forms.Label();
            this.lblInfo = new System.Windows.Forms.Label();
            this.StatusText = new System.Windows.Forms.TextBox();
            this.txtDNI = new System.Windows.Forms.TextBox();
            this.lblDNI = new System.Windows.Forms.Label();
            this.iconError = new FontAwesome.Sharp.IconPictureBox();
            this.iconEsperando = new FontAwesome.Sharp.IconPictureBox();
            this.iconAceptado = new FontAwesome.Sharp.IconPictureBox();
            this.lblHoraSalida = new System.Windows.Forms.Label();
            this.lblEmployee = new System.Windows.Forms.Label();
            this.lblHoraE = new System.Windows.Forms.Label();
            this.lblHoraS = new System.Windows.Forms.Label();
            this.btnRegistrarAsistencia = new desktop_employee.src.utils.Botones.CustomButton();
            this.lblHoraEntrada = new System.Windows.Forms.Label();
            this.panel2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.iconError)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconEsperando)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconAceptado)).BeginInit();
            this.SuspendLayout();
            // 
            // panel2
            // 
            this.panel2.BackColor = System.Drawing.Color.WhiteSmoke;
            this.panel2.Controls.Add(this.lblPromt);
            this.panel2.Controls.Add(this.lblInfo);
            this.panel2.Controls.Add(this.StatusText);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel2.Location = new System.Drawing.Point(0, 0);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(673, 192);
            this.panel2.TabIndex = 17;
            // 
            // lblPromt
            // 
            this.lblPromt.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblPromt.AutoSize = true;
            this.lblPromt.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblPromt.Location = new System.Drawing.Point(33, 14);
            this.lblPromt.Name = "lblPromt";
            this.lblPromt.Size = new System.Drawing.Size(56, 25);
            this.lblPromt.TabIndex = 13;
            this.lblPromt.Text = "Promt";
            // 
            // lblInfo
            // 
            this.lblInfo.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblInfo.AutoSize = true;
            this.lblInfo.Font = new System.Drawing.Font("Abel", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblInfo.Location = new System.Drawing.Point(33, 50);
            this.lblInfo.Name = "lblInfo";
            this.lblInfo.Size = new System.Drawing.Size(48, 31);
            this.lblInfo.TabIndex = 14;
            this.lblInfo.Text = "Info";
            // 
            // StatusText
            // 
            this.StatusText.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.StatusText.BackColor = System.Drawing.SystemColors.Window;
            this.StatusText.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusText.Location = new System.Drawing.Point(33, 84);
            this.StatusText.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.StatusText.Multiline = true;
            this.StatusText.Name = "StatusText";
            this.StatusText.ReadOnly = true;
            this.StatusText.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.StatusText.Size = new System.Drawing.Size(599, 95);
            this.StatusText.TabIndex = 4;
            // 
            // txtDNI
            // 
            this.txtDNI.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtDNI.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtDNI.Location = new System.Drawing.Point(180, 239);
            this.txtDNI.Name = "txtDNI";
            this.txtDNI.Size = new System.Drawing.Size(194, 32);
            this.txtDNI.TabIndex = 50;
            this.txtDNI.TextChanged += new System.EventHandler(this.txtDNI_TextChanged);
            this.txtDNI.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtDNI_KeyPress);
            // 
            // lblDNI
            // 
            this.lblDNI.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.lblDNI.AutoSize = true;
            this.lblDNI.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblDNI.Location = new System.Drawing.Point(122, 246);
            this.lblDNI.Name = "lblDNI";
            this.lblDNI.Size = new System.Drawing.Size(37, 25);
            this.lblDNI.TabIndex = 49;
            this.lblDNI.Text = "DNI";
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
            this.iconError.Location = new System.Drawing.Point(201, 314);
            this.iconError.Name = "iconError";
            this.iconError.Size = new System.Drawing.Size(225, 200);
            this.iconError.TabIndex = 48;
            this.iconError.TabStop = false;
            this.iconError.Visible = false;
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
            this.iconEsperando.Location = new System.Drawing.Point(201, 314);
            this.iconEsperando.Name = "iconEsperando";
            this.iconEsperando.Size = new System.Drawing.Size(229, 200);
            this.iconEsperando.TabIndex = 46;
            this.iconEsperando.TabStop = false;
            this.iconEsperando.Visible = false;
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
            this.iconAceptado.Location = new System.Drawing.Point(200, 314);
            this.iconAceptado.Name = "iconAceptado";
            this.iconAceptado.Size = new System.Drawing.Size(230, 200);
            this.iconAceptado.TabIndex = 47;
            this.iconAceptado.TabStop = false;
            this.iconAceptado.Visible = false;
            // 
            // lblHoraSalida
            // 
            this.lblHoraSalida.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraSalida.AutoSize = true;
            this.lblHoraSalida.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraSalida.Location = new System.Drawing.Point(441, 714);
            this.lblHoraSalida.Name = "lblHoraSalida";
            this.lblHoraSalida.Size = new System.Drawing.Size(209, 44);
            this.lblHoraSalida.TabIndex = 45;
            this.lblHoraSalida.Text = "--/--/---- --:--:--";
            // 
            // lblEmployee
            // 
            this.lblEmployee.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblEmployee.AutoSize = true;
            this.lblEmployee.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblEmployee.Location = new System.Drawing.Point(180, 537);
            this.lblEmployee.Name = "lblEmployee";
            this.lblEmployee.Size = new System.Drawing.Size(260, 44);
            this.lblEmployee.TabIndex = 41;
            this.lblEmployee.Text = "Nombre Empleado";
            // 
            // lblHoraE
            // 
            this.lblHoraE.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraE.AutoSize = true;
            this.lblHoraE.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraE.Location = new System.Drawing.Point(33, 639);
            this.lblHoraE.Name = "lblHoraE";
            this.lblHoraE.Size = new System.Drawing.Size(192, 44);
            this.lblHoraE.TabIndex = 42;
            this.lblHoraE.Text = "Hora Entrada";
            // 
            // lblHoraS
            // 
            this.lblHoraS.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraS.AutoSize = true;
            this.lblHoraS.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraS.Location = new System.Drawing.Point(441, 639);
            this.lblHoraS.Name = "lblHoraS";
            this.lblHoraS.Size = new System.Drawing.Size(170, 44);
            this.lblHoraS.TabIndex = 43;
            this.lblHoraS.Text = "Hora Salida";
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
            this.btnRegistrarAsistencia.Location = new System.Drawing.Point(406, 232);
            this.btnRegistrarAsistencia.Name = "btnRegistrarAsistencia";
            this.btnRegistrarAsistencia.Size = new System.Drawing.Size(183, 48);
            this.btnRegistrarAsistencia.TabIndex = 53;
            this.btnRegistrarAsistencia.Text = "Registrar Asistencia";
            this.btnRegistrarAsistencia.TextColor = System.Drawing.Color.Black;
            this.btnRegistrarAsistencia.UseVisualStyleBackColor = false;
            this.btnRegistrarAsistencia.Click += new System.EventHandler(this.btnRegistrarAsistencia_ClickAsync);
            // 
            // lblHoraEntrada
            // 
            this.lblHoraEntrada.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.lblHoraEntrada.AutoSize = true;
            this.lblHoraEntrada.Font = new System.Drawing.Font("Abel", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblHoraEntrada.Location = new System.Drawing.Point(33, 714);
            this.lblHoraEntrada.Name = "lblHoraEntrada";
            this.lblHoraEntrada.Size = new System.Drawing.Size(209, 44);
            this.lblHoraEntrada.TabIndex = 54;
            this.lblHoraEntrada.Text = "--/--/---- --:--:--";
            // 
            // frmAssistanceDNI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(673, 806);
            this.Controls.Add(this.lblHoraEntrada);
            this.Controls.Add(this.btnRegistrarAsistencia);
            this.Controls.Add(this.txtDNI);
            this.Controls.Add(this.lblDNI);
            this.Controls.Add(this.iconError);
            this.Controls.Add(this.iconEsperando);
            this.Controls.Add(this.iconAceptado);
            this.Controls.Add(this.lblHoraSalida);
            this.Controls.Add(this.lblEmployee);
            this.Controls.Add(this.lblHoraE);
            this.Controls.Add(this.lblHoraS);
            this.Controls.Add(this.panel2);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmAssistanceDNI";
            this.Text = "frmAssistanceDNI";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.frmAssistanceDNI_FormClosing);
            this.Load += new System.EventHandler(this.frmAssistanceDNI_Load);
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.iconError)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconEsperando)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.iconAceptado)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label lblPromt;
        private System.Windows.Forms.Label lblInfo;
        private System.Windows.Forms.TextBox StatusText;
        private System.Windows.Forms.TextBox txtDNI;
        private System.Windows.Forms.Label lblDNI;
        private FontAwesome.Sharp.IconPictureBox iconError;
        private FontAwesome.Sharp.IconPictureBox iconEsperando;
        private FontAwesome.Sharp.IconPictureBox iconAceptado;
        private System.Windows.Forms.Label lblHoraSalida;
        private System.Windows.Forms.Label lblEmployee;
        private System.Windows.Forms.Label lblHoraE;
        private System.Windows.Forms.Label lblHoraS;
        private utils.Botones.CustomButton btnRegistrarAsistencia;
        private System.Windows.Forms.Label lblHoraEntrada;
    }
}