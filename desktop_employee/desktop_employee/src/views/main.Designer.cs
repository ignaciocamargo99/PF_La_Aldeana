
namespace desktop_employee
{
    partial class main
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
            this.btnEmployees = new System.Windows.Forms.Button();
            this.btnRegisterAssistance = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnEmployees
            // 
            this.btnEmployees.Location = new System.Drawing.Point(308, 103);
            this.btnEmployees.Name = "btnEmployees";
            this.btnEmployees.Size = new System.Drawing.Size(139, 60);
            this.btnEmployees.TabIndex = 0;
            this.btnEmployees.Text = "Empleados";
            this.btnEmployees.UseVisualStyleBackColor = true;
            this.btnEmployees.Click += new System.EventHandler(this.btnEmployees_Click);
            // 
            // btnRegisterAssistance
            // 
            this.btnRegisterAssistance.Location = new System.Drawing.Point(323, 214);
            this.btnRegisterAssistance.Name = "btnRegisterAssistance";
            this.btnRegisterAssistance.Size = new System.Drawing.Size(134, 66);
            this.btnRegisterAssistance.TabIndex = 1;
            this.btnRegisterAssistance.Text = "Registrar Asistencia";
            this.btnRegisterAssistance.UseVisualStyleBackColor = true;
            this.btnRegisterAssistance.Click += new System.EventHandler(this.btnRegisterAssistance_Click);
            // 
            // main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(836, 481);
            this.Controls.Add(this.btnRegisterAssistance);
            this.Controls.Add(this.btnEmployees);
            this.Name = "main";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnEmployees;
        private System.Windows.Forms.Button btnRegisterAssistance;
    }
}

