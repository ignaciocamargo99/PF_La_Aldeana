
namespace desktop_employee.src.views.Employees
{
    partial class frmEditEmployee
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
            this.txtDni = new System.Windows.Forms.TextBox();
            this.lblDni = new System.Windows.Forms.Label();
            this.lblNombre = new System.Windows.Forms.Label();
            this.lblApellido = new System.Windows.Forms.Label();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.txtApellido = new System.Windows.Forms.TextBox();
            this.btnAceptar = new System.Windows.Forms.Button();
            this.btnCancelar = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.label1 = new System.Windows.Forms.Label();
            this.dgvFingerEmployee = new System.Windows.Forms.DataGridView();
            this.panel2 = new System.Windows.Forms.Panel();
            this.btnEliminarII = new FontAwesome.Sharp.IconButton();
            this.btnEliminarPI = new FontAwesome.Sharp.IconButton();
            this.btnEliminarID = new FontAwesome.Sharp.IconButton();
            this.btnEliminarPD = new FontAwesome.Sharp.IconButton();
            this.btnCapturarPI = new FontAwesome.Sharp.IconButton();
            this.btnCapturarII = new FontAwesome.Sharp.IconButton();
            this.btnCapturarID = new FontAwesome.Sharp.IconButton();
            this.btnCapturarPD = new FontAwesome.Sharp.IconButton();
            this.lblII = new System.Windows.Forms.Label();
            this.lblID = new System.Windows.Forms.Label();
            this.lblPI = new System.Windows.Forms.Label();
            this.lblPD = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvFingerEmployee)).BeginInit();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // txtDni
            // 
            this.txtDni.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtDni.Enabled = false;
            this.txtDni.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtDni.Location = new System.Drawing.Point(188, 30);
            this.txtDni.Name = "txtDni";
            this.txtDni.ReadOnly = true;
            this.txtDni.Size = new System.Drawing.Size(316, 32);
            this.txtDni.TabIndex = 0;
            // 
            // lblDni
            // 
            this.lblDni.AutoSize = true;
            this.lblDni.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblDni.Location = new System.Drawing.Point(101, 37);
            this.lblDni.Name = "lblDni";
            this.lblDni.Size = new System.Drawing.Size(37, 25);
            this.lblDni.TabIndex = 1;
            this.lblDni.Text = "DNI";
            // 
            // lblNombre
            // 
            this.lblNombre.AutoSize = true;
            this.lblNombre.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblNombre.Location = new System.Drawing.Point(70, 81);
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.Size = new System.Drawing.Size(68, 25);
            this.lblNombre.TabIndex = 2;
            this.lblNombre.Text = "Nombre";
            // 
            // lblApellido
            // 
            this.lblApellido.AutoSize = true;
            this.lblApellido.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblApellido.Location = new System.Drawing.Point(70, 127);
            this.lblApellido.Name = "lblApellido";
            this.lblApellido.Size = new System.Drawing.Size(69, 25);
            this.lblApellido.TabIndex = 3;
            this.lblApellido.Text = "Apellido";
            // 
            // txtNombre
            // 
            this.txtNombre.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtNombre.Enabled = false;
            this.txtNombre.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtNombre.Location = new System.Drawing.Point(188, 74);
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.ReadOnly = true;
            this.txtNombre.Size = new System.Drawing.Size(316, 32);
            this.txtNombre.TabIndex = 4;
            // 
            // txtApellido
            // 
            this.txtApellido.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtApellido.Enabled = false;
            this.txtApellido.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtApellido.Location = new System.Drawing.Point(188, 120);
            this.txtApellido.Name = "txtApellido";
            this.txtApellido.ReadOnly = true;
            this.txtApellido.Size = new System.Drawing.Size(316, 32);
            this.txtApellido.TabIndex = 5;
            // 
            // btnAceptar
            // 
            this.btnAceptar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnAceptar.Enabled = false;
            this.btnAceptar.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnAceptar.Location = new System.Drawing.Point(593, 399);
            this.btnAceptar.Name = "btnAceptar";
            this.btnAceptar.Size = new System.Drawing.Size(100, 40);
            this.btnAceptar.TabIndex = 7;
            this.btnAceptar.Text = "Aceptar";
            this.btnAceptar.UseVisualStyleBackColor = true;
            this.btnAceptar.Click += new System.EventHandler(this.btnAceptar_Click);
            // 
            // btnCancelar
            // 
            this.btnCancelar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCancelar.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnCancelar.Location = new System.Drawing.Point(719, 399);
            this.btnCancelar.Name = "btnCancelar";
            this.btnCancelar.Size = new System.Drawing.Size(100, 40);
            this.btnCancelar.TabIndex = 8;
            this.btnCancelar.Text = "Cancelar";
            this.btnCancelar.UseVisualStyleBackColor = true;
            this.btnCancelar.Click += new System.EventHandler(this.btnCancelar_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.label1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(875, 68);
            this.panel1.TabIndex = 11;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Abel", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.label1.Location = new System.Drawing.Point(40, 23);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(193, 27);
            this.label1.TabIndex = 12;
            this.label1.Text = "DATOS DEL EMPLEADO";
            // 
            // dgvFingerEmployee
            // 
            this.dgvFingerEmployee.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Right)));
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.SystemColors.Control;
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            dataGridViewCellStyle1.ForeColor = System.Drawing.SystemColors.WindowText;
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dgvFingerEmployee.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.dgvFingerEmployee.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.SystemColors.Window;
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            dataGridViewCellStyle2.ForeColor = System.Drawing.SystemColors.ControlText;
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dgvFingerEmployee.DefaultCellStyle = dataGridViewCellStyle2;
            this.dgvFingerEmployee.Location = new System.Drawing.Point(593, 161);
            this.dgvFingerEmployee.Name = "dgvFingerEmployee";
            this.dgvFingerEmployee.RowTemplate.Height = 25;
            this.dgvFingerEmployee.Size = new System.Drawing.Size(243, 185);
            this.dgvFingerEmployee.TabIndex = 12;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.btnEliminarII);
            this.panel2.Controls.Add(this.dgvFingerEmployee);
            this.panel2.Controls.Add(this.btnEliminarPI);
            this.panel2.Controls.Add(this.btnEliminarID);
            this.panel2.Controls.Add(this.btnEliminarPD);
            this.panel2.Controls.Add(this.btnCapturarPI);
            this.panel2.Controls.Add(this.btnCapturarII);
            this.panel2.Controls.Add(this.btnCapturarID);
            this.panel2.Controls.Add(this.btnCapturarPD);
            this.panel2.Controls.Add(this.lblII);
            this.panel2.Controls.Add(this.lblID);
            this.panel2.Controls.Add(this.lblPI);
            this.panel2.Controls.Add(this.lblPD);
            this.panel2.Controls.Add(this.label2);
            this.panel2.Controls.Add(this.btnCancelar);
            this.panel2.Controls.Add(this.btnAceptar);
            this.panel2.Controls.Add(this.txtApellido);
            this.panel2.Controls.Add(this.txtNombre);
            this.panel2.Controls.Add(this.lblApellido);
            this.panel2.Controls.Add(this.lblNombre);
            this.panel2.Controls.Add(this.lblDni);
            this.panel2.Controls.Add(this.txtDni);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(0, 68);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(875, 451);
            this.panel2.TabIndex = 12;
            // 
            // btnEliminarII
            // 
            this.btnEliminarII.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnEliminarII.FlatAppearance.BorderSize = 0;
            this.btnEliminarII.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnEliminarII.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.btnEliminarII.IconColor = System.Drawing.Color.Red;
            this.btnEliminarII.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnEliminarII.Location = new System.Drawing.Point(349, 344);
            this.btnEliminarII.Name = "btnEliminarII";
            this.btnEliminarII.Size = new System.Drawing.Size(45, 50);
            this.btnEliminarII.TabIndex = 25;
            this.btnEliminarII.UseVisualStyleBackColor = true;
            this.btnEliminarII.Click += new System.EventHandler(this.btnEliminarII_Click);
            // 
            // btnEliminarPI
            // 
            this.btnEliminarPI.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnEliminarPI.FlatAppearance.BorderSize = 0;
            this.btnEliminarPI.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnEliminarPI.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.btnEliminarPI.IconColor = System.Drawing.Color.Red;
            this.btnEliminarPI.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnEliminarPI.Location = new System.Drawing.Point(349, 296);
            this.btnEliminarPI.Name = "btnEliminarPI";
            this.btnEliminarPI.Size = new System.Drawing.Size(45, 50);
            this.btnEliminarPI.TabIndex = 24;
            this.btnEliminarPI.UseVisualStyleBackColor = true;
            this.btnEliminarPI.Click += new System.EventHandler(this.btnEliminarPI_Click);
            // 
            // btnEliminarID
            // 
            this.btnEliminarID.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnEliminarID.FlatAppearance.BorderSize = 0;
            this.btnEliminarID.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnEliminarID.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.btnEliminarID.IconColor = System.Drawing.Color.Red;
            this.btnEliminarID.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnEliminarID.Location = new System.Drawing.Point(349, 248);
            this.btnEliminarID.Name = "btnEliminarID";
            this.btnEliminarID.Size = new System.Drawing.Size(45, 50);
            this.btnEliminarID.TabIndex = 23;
            this.btnEliminarID.UseVisualStyleBackColor = true;
            this.btnEliminarID.Click += new System.EventHandler(this.btnEliminarID_Click);
            // 
            // btnEliminarPD
            // 
            this.btnEliminarPD.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnEliminarPD.FlatAppearance.BorderSize = 0;
            this.btnEliminarPD.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnEliminarPD.IconChar = FontAwesome.Sharp.IconChar.Times;
            this.btnEliminarPD.IconColor = System.Drawing.Color.Red;
            this.btnEliminarPD.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnEliminarPD.Location = new System.Drawing.Point(349, 192);
            this.btnEliminarPD.Name = "btnEliminarPD";
            this.btnEliminarPD.Size = new System.Drawing.Size(45, 50);
            this.btnEliminarPD.TabIndex = 22;
            this.btnEliminarPD.UseVisualStyleBackColor = true;
            this.btnEliminarPD.Click += new System.EventHandler(this.btnEliminarPD_Click);
            // 
            // btnCapturarPI
            // 
            this.btnCapturarPI.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnCapturarPI.FlatAppearance.BorderSize = 0;
            this.btnCapturarPI.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCapturarPI.IconChar = FontAwesome.Sharp.IconChar.Plus;
            this.btnCapturarPI.IconColor = System.Drawing.Color.Green;
            this.btnCapturarPI.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnCapturarPI.Location = new System.Drawing.Point(272, 296);
            this.btnCapturarPI.Name = "btnCapturarPI";
            this.btnCapturarPI.Size = new System.Drawing.Size(45, 50);
            this.btnCapturarPI.TabIndex = 21;
            this.btnCapturarPI.UseVisualStyleBackColor = true;
            this.btnCapturarPI.Click += new System.EventHandler(this.btnCapturarPI_Click);
            // 
            // btnCapturarII
            // 
            this.btnCapturarII.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnCapturarII.FlatAppearance.BorderSize = 0;
            this.btnCapturarII.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCapturarII.IconChar = FontAwesome.Sharp.IconChar.Plus;
            this.btnCapturarII.IconColor = System.Drawing.Color.Green;
            this.btnCapturarII.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnCapturarII.Location = new System.Drawing.Point(272, 344);
            this.btnCapturarII.Name = "btnCapturarII";
            this.btnCapturarII.Size = new System.Drawing.Size(45, 50);
            this.btnCapturarII.TabIndex = 20;
            this.btnCapturarII.UseVisualStyleBackColor = true;
            this.btnCapturarII.Click += new System.EventHandler(this.btnCapturarII_Click);
            // 
            // btnCapturarID
            // 
            this.btnCapturarID.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnCapturarID.FlatAppearance.BorderSize = 0;
            this.btnCapturarID.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCapturarID.IconChar = FontAwesome.Sharp.IconChar.Plus;
            this.btnCapturarID.IconColor = System.Drawing.Color.Green;
            this.btnCapturarID.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnCapturarID.Location = new System.Drawing.Point(272, 248);
            this.btnCapturarID.Name = "btnCapturarID";
            this.btnCapturarID.Size = new System.Drawing.Size(45, 50);
            this.btnCapturarID.TabIndex = 19;
            this.btnCapturarID.UseVisualStyleBackColor = true;
            this.btnCapturarID.Click += new System.EventHandler(this.btnCapturarID_Click);
            // 
            // btnCapturarPD
            // 
            this.btnCapturarPD.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnCapturarPD.FlatAppearance.BorderSize = 0;
            this.btnCapturarPD.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCapturarPD.IconChar = FontAwesome.Sharp.IconChar.Plus;
            this.btnCapturarPD.IconColor = System.Drawing.Color.Green;
            this.btnCapturarPD.IconFont = FontAwesome.Sharp.IconFont.Auto;
            this.btnCapturarPD.Location = new System.Drawing.Point(272, 192);
            this.btnCapturarPD.Name = "btnCapturarPD";
            this.btnCapturarPD.Size = new System.Drawing.Size(45, 50);
            this.btnCapturarPD.TabIndex = 18;
            this.btnCapturarPD.UseVisualStyleBackColor = true;
            this.btnCapturarPD.Click += new System.EventHandler(this.btnCapturarPD_Click);
            // 
            // lblII
            // 
            this.lblII.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lblII.AutoSize = true;
            this.lblII.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblII.Location = new System.Drawing.Point(70, 355);
            this.lblII.Name = "lblII";
            this.lblII.Size = new System.Drawing.Size(167, 25);
            this.lblII.TabIndex = 16;
            this.lblII.Text = "Dedo Índice Izquierdo";
            // 
            // lblID
            // 
            this.lblID.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lblID.AutoSize = true;
            this.lblID.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblID.Location = new System.Drawing.Point(70, 259);
            this.lblID.Name = "lblID";
            this.lblID.Size = new System.Drawing.Size(161, 25);
            this.lblID.TabIndex = 15;
            this.lblID.Text = "Dedo Índice Derecho";
            // 
            // lblPI
            // 
            this.lblPI.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lblPI.AutoSize = true;
            this.lblPI.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblPI.Location = new System.Drawing.Point(70, 307);
            this.lblPI.Name = "lblPI";
            this.lblPI.Size = new System.Drawing.Size(169, 25);
            this.lblPI.TabIndex = 14;
            this.lblPI.Text = "Dedo Pulgar Izquierdo";
            // 
            // lblPD
            // 
            this.lblPD.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.lblPD.AutoSize = true;
            this.lblPD.Font = new System.Drawing.Font("Abel", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblPD.Location = new System.Drawing.Point(70, 203);
            this.lblPD.Name = "lblPD";
            this.lblPD.Size = new System.Drawing.Size(163, 25);
            this.lblPD.TabIndex = 13;
            this.lblPD.Text = "Dedo Pulgar Derecho";
            // 
            // label2
            // 
            this.label2.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.label2.Location = new System.Drawing.Point(620, 81);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(164, 25);
            this.label2.TabIndex = 11;
            this.label2.Text = "FOTO DEL EMPLEADO";
            // 
            // frmEditEmployee
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(875, 519);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmEditEmployee";
            this.Text = "Dedo Pulgar Derecho";
            this.Load += new System.EventHandler(this.frmEditEmployee_LoadAsync);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dgvFingerEmployee)).EndInit();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TextBox txtDni;
        private System.Windows.Forms.Label lblDni;
        private System.Windows.Forms.Label lblNombre;
        private System.Windows.Forms.Label lblApellido;
        private System.Windows.Forms.TextBox txtNombre;
        private System.Windows.Forms.TextBox txtApellido;
        private System.Windows.Forms.Button btnAceptar;
        private System.Windows.Forms.Button btnCancelar;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.DataGridView dgvFingerEmployee;
        private System.Windows.Forms.Label lblII;
        private System.Windows.Forms.Label lblID;
        private System.Windows.Forms.Label lblPI;
        private System.Windows.Forms.Label lblPD;
        private FontAwesome.Sharp.IconButton btnCapturarPD;
        private FontAwesome.Sharp.IconButton btnCapturarPI;
        private FontAwesome.Sharp.IconButton btnCapturarII;
        private FontAwesome.Sharp.IconButton btnCapturarID;
        private FontAwesome.Sharp.IconButton btnEliminarII;
        private FontAwesome.Sharp.IconButton btnEliminarPI;
        private FontAwesome.Sharp.IconButton btnEliminarID;
        private FontAwesome.Sharp.IconButton btnEliminarPD;
    }
}