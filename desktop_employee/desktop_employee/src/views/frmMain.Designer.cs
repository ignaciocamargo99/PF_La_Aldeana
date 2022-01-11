
namespace desktop_employee
{
    partial class frmMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.pnlMenu = new System.Windows.Forms.Panel();
            this.ibtnAsistenciaDNI = new FontAwesome.Sharp.IconButton();
            this.ibtnEmpleados = new FontAwesome.Sharp.IconButton();
            this.ibtnAsistencia = new FontAwesome.Sharp.IconButton();
            this.pnlLogo = new System.Windows.Forms.Panel();
            this.ibtnMenu = new FontAwesome.Sharp.IconButton();
            this.pbxLogo = new System.Windows.Forms.PictureBox();
            this.pnlTitle = new System.Windows.Forms.Panel();
            this.lblTitulo = new System.Windows.Forms.Label();
            this.ibtnMinimizar = new FontAwesome.Sharp.IconButton();
            this.ibtnClose = new FontAwesome.Sharp.IconButton();
            this.pnlDesktop = new System.Windows.Forms.Panel();
            this.pnlMenu.SuspendLayout();
            this.pnlLogo.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pbxLogo)).BeginInit();
            this.pnlTitle.SuspendLayout();
            this.SuspendLayout();
            // 
            // pnlMenu
            // 
            this.pnlMenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(222)))), ((int)(((byte)(249)))));
            this.pnlMenu.Controls.Add(this.ibtnAsistenciaDNI);
            this.pnlMenu.Controls.Add(this.ibtnEmpleados);
            this.pnlMenu.Controls.Add(this.ibtnAsistencia);
            this.pnlMenu.Controls.Add(this.pnlLogo);
            this.pnlMenu.Dock = System.Windows.Forms.DockStyle.Left;
            this.pnlMenu.Location = new System.Drawing.Point(0, 0);
            this.pnlMenu.Name = "pnlMenu";
            this.pnlMenu.Size = new System.Drawing.Size(216, 514);
            this.pnlMenu.TabIndex = 2;
            // 
            // ibtnAsistenciaDNI
            // 
            this.ibtnAsistenciaDNI.Dock = System.Windows.Forms.DockStyle.Top;
            this.ibtnAsistenciaDNI.FlatAppearance.BorderSize = 0;
            this.ibtnAsistenciaDNI.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnAsistenciaDNI.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.ibtnAsistenciaDNI.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnAsistenciaDNI.IconChar = FontAwesome.Sharp.IconChar.IdCard;
            this.ibtnAsistenciaDNI.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnAsistenciaDNI.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnAsistenciaDNI.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnAsistenciaDNI.Location = new System.Drawing.Point(0, 342);
            this.ibtnAsistenciaDNI.Name = "ibtnAsistenciaDNI";
            this.ibtnAsistenciaDNI.Padding = new System.Windows.Forms.Padding(10, 0, 0, 0);
            this.ibtnAsistenciaDNI.Size = new System.Drawing.Size(216, 138);
            this.ibtnAsistenciaDNI.TabIndex = 6;
            this.ibtnAsistenciaDNI.Tag = "EMPLEADOS";
            this.ibtnAsistenciaDNI.Text = "ASISTENCIA DNI";
            this.ibtnAsistenciaDNI.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnAsistenciaDNI.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.ibtnAsistenciaDNI.UseVisualStyleBackColor = true;
            this.ibtnAsistenciaDNI.Click += new System.EventHandler(this.ibtnAsistenciaDNI_Click);
            // 
            // ibtnEmpleados
            // 
            this.ibtnEmpleados.Dock = System.Windows.Forms.DockStyle.Top;
            this.ibtnEmpleados.FlatAppearance.BorderSize = 0;
            this.ibtnEmpleados.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnEmpleados.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.ibtnEmpleados.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnEmpleados.IconChar = FontAwesome.Sharp.IconChar.User;
            this.ibtnEmpleados.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnEmpleados.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnEmpleados.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnEmpleados.Location = new System.Drawing.Point(0, 213);
            this.ibtnEmpleados.Name = "ibtnEmpleados";
            this.ibtnEmpleados.Padding = new System.Windows.Forms.Padding(10, 0, 0, 0);
            this.ibtnEmpleados.Size = new System.Drawing.Size(216, 129);
            this.ibtnEmpleados.TabIndex = 5;
            this.ibtnEmpleados.Tag = "EMPLEADOS";
            this.ibtnEmpleados.Text = "EMPLEADOS";
            this.ibtnEmpleados.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnEmpleados.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.ibtnEmpleados.UseVisualStyleBackColor = true;
            this.ibtnEmpleados.Click += new System.EventHandler(this.ibtnEmpleados_Click);
            // 
            // ibtnAsistencia
            // 
            this.ibtnAsistencia.Dock = System.Windows.Forms.DockStyle.Top;
            this.ibtnAsistencia.FlatAppearance.BorderSize = 0;
            this.ibtnAsistencia.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnAsistencia.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.ibtnAsistencia.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnAsistencia.IconChar = FontAwesome.Sharp.IconChar.Fingerprint;
            this.ibtnAsistencia.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnAsistencia.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnAsistencia.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnAsistencia.Location = new System.Drawing.Point(0, 86);
            this.ibtnAsistencia.Name = "ibtnAsistencia";
            this.ibtnAsistencia.Padding = new System.Windows.Forms.Padding(10, 0, 0, 0);
            this.ibtnAsistencia.Size = new System.Drawing.Size(216, 127);
            this.ibtnAsistencia.TabIndex = 4;
            this.ibtnAsistencia.Tag = "ASISTENCIA HUELLA";
            this.ibtnAsistencia.Text = "ASISTENCIA HUELLA";
            this.ibtnAsistencia.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnAsistencia.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.ibtnAsistencia.UseVisualStyleBackColor = true;
            this.ibtnAsistencia.Click += new System.EventHandler(this.ibtnAsistencia_Click);
            // 
            // pnlLogo
            // 
            this.pnlLogo.Controls.Add(this.ibtnMenu);
            this.pnlLogo.Controls.Add(this.pbxLogo);
            this.pnlLogo.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlLogo.Location = new System.Drawing.Point(0, 0);
            this.pnlLogo.Name = "pnlLogo";
            this.pnlLogo.Size = new System.Drawing.Size(216, 86);
            this.pnlLogo.TabIndex = 2;
            // 
            // ibtnMenu
            // 
            this.ibtnMenu.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.ibtnMenu.FlatAppearance.BorderSize = 0;
            this.ibtnMenu.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnMenu.IconChar = FontAwesome.Sharp.IconChar.Bars;
            this.ibtnMenu.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnMenu.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnMenu.Location = new System.Drawing.Point(171, -1);
            this.ibtnMenu.Name = "ibtnMenu";
            this.ibtnMenu.Size = new System.Drawing.Size(39, 86);
            this.ibtnMenu.TabIndex = 1;
            this.ibtnMenu.UseVisualStyleBackColor = true;
            this.ibtnMenu.Click += new System.EventHandler(this.ibtnMenu_Click);
            // 
            // pbxLogo
            // 
            this.pbxLogo.Image = global::desktop_employee.Properties.Resources.logo_expandido;
            this.pbxLogo.Location = new System.Drawing.Point(0, 0);
            this.pbxLogo.Name = "pbxLogo";
            this.pbxLogo.Size = new System.Drawing.Size(165, 85);
            this.pbxLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pbxLogo.TabIndex = 0;
            this.pbxLogo.TabStop = false;
            // 
            // pnlTitle
            // 
            this.pnlTitle.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(246)))), ((int)(((byte)(134)))), ((int)(((byte)(62)))));
            this.pnlTitle.Controls.Add(this.lblTitulo);
            this.pnlTitle.Controls.Add(this.ibtnMinimizar);
            this.pnlTitle.Controls.Add(this.ibtnClose);
            this.pnlTitle.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTitle.Location = new System.Drawing.Point(216, 0);
            this.pnlTitle.Name = "pnlTitle";
            this.pnlTitle.Size = new System.Drawing.Size(779, 86);
            this.pnlTitle.TabIndex = 3;
            // 
            // lblTitulo
            // 
            this.lblTitulo.AutoSize = true;
            this.lblTitulo.Font = new System.Drawing.Font("Verdana", 28F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblTitulo.Location = new System.Drawing.Point(36, 20);
            this.lblTitulo.Name = "lblTitulo";
            this.lblTitulo.Size = new System.Drawing.Size(180, 46);
            this.lblTitulo.TabIndex = 0;
            this.lblTitulo.Text = "TITULO";
            // 
            // ibtnMinimizar
            // 
            this.ibtnMinimizar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.ibtnMinimizar.FlatAppearance.BorderSize = 0;
            this.ibtnMinimizar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnMinimizar.IconChar = FontAwesome.Sharp.IconChar.WindowMinimize;
            this.ibtnMinimizar.IconColor = System.Drawing.Color.White;
            this.ibtnMinimizar.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnMinimizar.Location = new System.Drawing.Point(680, 0);
            this.ibtnMinimizar.Name = "ibtnMinimizar";
            this.ibtnMinimizar.Size = new System.Drawing.Size(29, 34);
            this.ibtnMinimizar.TabIndex = 3;
            this.ibtnMinimizar.UseVisualStyleBackColor = true;
            this.ibtnMinimizar.Click += new System.EventHandler(this.ibtnMinimizar_Click);
            // 
            // ibtnClose
            // 
            this.ibtnClose.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.ibtnClose.FlatAppearance.BorderSize = 0;
            this.ibtnClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnClose.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.ibtnClose.IconColor = System.Drawing.Color.White;
            this.ibtnClose.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnClose.Location = new System.Drawing.Point(750, 0);
            this.ibtnClose.Name = "ibtnClose";
            this.ibtnClose.Size = new System.Drawing.Size(29, 34);
            this.ibtnClose.TabIndex = 2;
            this.ibtnClose.UseVisualStyleBackColor = true;
            this.ibtnClose.Click += new System.EventHandler(this.ibtnClose_Click);
            // 
            // pnlDesktop
            // 
            this.pnlDesktop.BackColor = System.Drawing.Color.White;
            this.pnlDesktop.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlDesktop.Location = new System.Drawing.Point(216, 86);
            this.pnlDesktop.Name = "pnlDesktop";
            this.pnlDesktop.Size = new System.Drawing.Size(779, 428);
            this.pnlDesktop.TabIndex = 4;
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(995, 514);
            this.Controls.Add(this.pnlDesktop);
            this.Controls.Add(this.pnlTitle);
            this.Controls.Add(this.pnlMenu);
            this.Name = "frmMain";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.frmMain_Load);
            this.pnlMenu.ResumeLayout(false);
            this.pnlLogo.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pbxLogo)).EndInit();
            this.pnlTitle.ResumeLayout(false);
            this.pnlTitle.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Panel pnlMenu;
        private System.Windows.Forms.Panel pnlTitle;
        private System.Windows.Forms.Panel pnlLogo;
        private System.Windows.Forms.PictureBox pbxLogo;
        private System.Windows.Forms.Panel pnlDesktop;
        private FontAwesome.Sharp.IconButton ibtnMenu;
        private FontAwesome.Sharp.IconButton ibtnAsistencia;
        private FontAwesome.Sharp.IconButton ibtnEmpleados;
        private System.Windows.Forms.Label lblTitulo;
        private FontAwesome.Sharp.IconButton ibtnMinimizar;
        private FontAwesome.Sharp.IconButton ibtnClose;
        private FontAwesome.Sharp.IconButton ibtnAsistenciaDNI;
    }
}

