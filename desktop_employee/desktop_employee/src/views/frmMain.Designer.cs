
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
            this.ibtnEmpleados = new FontAwesome.Sharp.IconButton();
            this.ibtnAsistencia = new FontAwesome.Sharp.IconButton();
            this.pnlLogo = new System.Windows.Forms.Panel();
            this.ibtnMenu = new FontAwesome.Sharp.IconButton();
            this.pbxLogo = new System.Windows.Forms.PictureBox();
            this.pnlTitle = new System.Windows.Forms.Panel();
            this.ibtnMinimizar = new FontAwesome.Sharp.IconButton();
            this.ibtnMaximizar = new FontAwesome.Sharp.IconButton();
            this.ibtnClose = new FontAwesome.Sharp.IconButton();
            this.lblTitulo = new System.Windows.Forms.Label();
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
            this.pnlMenu.Controls.Add(this.ibtnEmpleados);
            this.pnlMenu.Controls.Add(this.ibtnAsistencia);
            this.pnlMenu.Controls.Add(this.pnlLogo);
            this.pnlMenu.Dock = System.Windows.Forms.DockStyle.Left;
            this.pnlMenu.Location = new System.Drawing.Point(0, 0);
            this.pnlMenu.Name = "pnlMenu";
            this.pnlMenu.Size = new System.Drawing.Size(216, 481);
            this.pnlMenu.TabIndex = 2;
            // 
            // ibtnEmpleados
            // 
            this.ibtnEmpleados.FlatAppearance.BorderSize = 0;
            this.ibtnEmpleados.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnEmpleados.Font = new System.Drawing.Font("Tahoma", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.ibtnEmpleados.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnEmpleados.IconChar = FontAwesome.Sharp.IconChar.User;
            this.ibtnEmpleados.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnEmpleados.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnEmpleados.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnEmpleados.Location = new System.Drawing.Point(6, 114);
            this.ibtnEmpleados.Name = "ibtnEmpleados";
            this.ibtnEmpleados.Size = new System.Drawing.Size(210, 59);
            this.ibtnEmpleados.TabIndex = 5;
            this.ibtnEmpleados.Tag = "EMPLEADOS";
            this.ibtnEmpleados.Text = "EMPLEADOS";
            this.ibtnEmpleados.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.ibtnEmpleados.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageBeforeText;
            this.ibtnEmpleados.UseVisualStyleBackColor = true;
            this.ibtnEmpleados.Click += new System.EventHandler(this.ibtnEmpleados_Click);
            // 
            // ibtnAsistencia
            // 
            this.ibtnAsistencia.FlatAppearance.BorderSize = 0;
            this.ibtnAsistencia.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnAsistencia.Font = new System.Drawing.Font("Tahoma", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.ibtnAsistencia.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnAsistencia.IconChar = FontAwesome.Sharp.IconChar.Fingerprint;
            this.ibtnAsistencia.IconColor = System.Drawing.Color.FromArgb(((int)(((byte)(56)))), ((int)(((byte)(60)))), ((int)(((byte)(119)))));
            this.ibtnAsistencia.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnAsistencia.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.ibtnAsistencia.Location = new System.Drawing.Point(10, 184);
            this.ibtnAsistencia.Name = "ibtnAsistencia";
            this.ibtnAsistencia.Size = new System.Drawing.Size(206, 59);
            this.ibtnAsistencia.TabIndex = 4;
            this.ibtnAsistencia.Tag = "ASISTENCIA";
            this.ibtnAsistencia.Text = "ASISTENCIA";
            this.ibtnAsistencia.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
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
            this.ibtnMenu.Location = new System.Drawing.Point(171, 0);
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
            this.pnlTitle.Controls.Add(this.ibtnMinimizar);
            this.pnlTitle.Controls.Add(this.ibtnMaximizar);
            this.pnlTitle.Controls.Add(this.ibtnClose);
            this.pnlTitle.Controls.Add(this.lblTitulo);
            this.pnlTitle.Dock = System.Windows.Forms.DockStyle.Top;
            this.pnlTitle.Location = new System.Drawing.Point(216, 0);
            this.pnlTitle.Name = "pnlTitle";
            this.pnlTitle.Size = new System.Drawing.Size(620, 86);
            this.pnlTitle.TabIndex = 3;
            this.pnlTitle.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pnlTitle_MouseDown);
            // 
            // ibtnMinimizar
            // 
            this.ibtnMinimizar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.ibtnMinimizar.FlatAppearance.BorderSize = 0;
            this.ibtnMinimizar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnMinimizar.IconChar = FontAwesome.Sharp.IconChar.WindowMinimize;
            this.ibtnMinimizar.IconColor = System.Drawing.Color.White;
            this.ibtnMinimizar.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnMinimizar.Location = new System.Drawing.Point(521, 0);
            this.ibtnMinimizar.Name = "ibtnMinimizar";
            this.ibtnMinimizar.Size = new System.Drawing.Size(29, 34);
            this.ibtnMinimizar.TabIndex = 3;
            this.ibtnMinimizar.UseVisualStyleBackColor = true;
            this.ibtnMinimizar.Click += new System.EventHandler(this.ibtnMinimizar_Click);
            // 
            // ibtnMaximizar
            // 
            this.ibtnMaximizar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.ibtnMaximizar.FlatAppearance.BorderSize = 0;
            this.ibtnMaximizar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnMaximizar.IconChar = FontAwesome.Sharp.IconChar.WindowMaximize;
            this.ibtnMaximizar.IconColor = System.Drawing.Color.White;
            this.ibtnMaximizar.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnMaximizar.Location = new System.Drawing.Point(556, 0);
            this.ibtnMaximizar.Name = "ibtnMaximizar";
            this.ibtnMaximizar.Size = new System.Drawing.Size(29, 34);
            this.ibtnMaximizar.TabIndex = 3;
            this.ibtnMaximizar.UseVisualStyleBackColor = true;
            this.ibtnMaximizar.Click += new System.EventHandler(this.ibtnMaximizar_Click);
            // 
            // ibtnClose
            // 
            this.ibtnClose.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.ibtnClose.FlatAppearance.BorderSize = 0;
            this.ibtnClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.ibtnClose.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.ibtnClose.IconColor = System.Drawing.Color.White;
            this.ibtnClose.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.ibtnClose.Location = new System.Drawing.Point(591, 0);
            this.ibtnClose.Name = "ibtnClose";
            this.ibtnClose.Size = new System.Drawing.Size(29, 34);
            this.ibtnClose.TabIndex = 2;
            this.ibtnClose.UseVisualStyleBackColor = true;
            this.ibtnClose.Click += new System.EventHandler(this.ibtnClose_Click);
            // 
            // lblTitulo
            // 
            this.lblTitulo.AutoSize = true;
            this.lblTitulo.Font = new System.Drawing.Font("Verdana", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblTitulo.Location = new System.Drawing.Point(37, 35);
            this.lblTitulo.Name = "lblTitulo";
            this.lblTitulo.Size = new System.Drawing.Size(89, 23);
            this.lblTitulo.TabIndex = 0;
            this.lblTitulo.Text = "TITULO";
            // 
            // pnlDesktop
            // 
            this.pnlDesktop.BackColor = System.Drawing.Color.White;
            this.pnlDesktop.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlDesktop.Location = new System.Drawing.Point(216, 86);
            this.pnlDesktop.Name = "pnlDesktop";
            this.pnlDesktop.Size = new System.Drawing.Size(620, 395);
            this.pnlDesktop.TabIndex = 4;
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(836, 481);
            this.Controls.Add(this.pnlDesktop);
            this.Controls.Add(this.pnlTitle);
            this.Controls.Add(this.pnlMenu);
            this.Name = "frmMain";
            this.Text = "Form1";
            this.Resize += new System.EventHandler(this.frmMain_Resize);
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
        private FontAwesome.Sharp.IconButton ibtnMaximizar;
        private FontAwesome.Sharp.IconButton ibtnClose;
    }
}

