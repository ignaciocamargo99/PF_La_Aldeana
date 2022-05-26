namespace desktop_employee
{
    partial class CaptureForm
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CaptureForm));
            this.StatusLabel = new System.Windows.Forms.Label();
            this.Picture = new System.Windows.Forms.PictureBox();
            this.Prompt = new System.Windows.Forms.TextBox();
            this.StatusText = new System.Windows.Forms.TextBox();
            this.StatusLine = new System.Windows.Forms.Label();
            this.btnAceptar = new desktop_employee.src.utils.Botones.CustomButton();
            ((System.ComponentModel.ISupportInitialize)(this.Picture)).BeginInit();
            this.SuspendLayout();
            // 
            // StatusLabel
            // 
            this.StatusLabel.AutoSize = true;
            this.StatusLabel.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusLabel.Location = new System.Drawing.Point(271, 126);
            this.StatusLabel.Name = "StatusLabel";
            this.StatusLabel.Size = new System.Drawing.Size(67, 25);
            this.StatusLabel.TabIndex = 3;
            this.StatusLabel.Text = "Status:";
            // 
            // Picture
            // 
            this.Picture.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.Picture.BackColor = System.Drawing.SystemColors.Window;
            this.Picture.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.Picture.Location = new System.Drawing.Point(12, 16);
            this.Picture.Name = "Picture";
            this.Picture.Size = new System.Drawing.Size(247, 364);
            this.Picture.TabIndex = 0;
            this.Picture.TabStop = false;
            // 
            // Prompt
            // 
            this.Prompt.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.Prompt.Enabled = false;
            this.Prompt.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.Prompt.Location = new System.Drawing.Point(271, 16);
            this.Prompt.Name = "Prompt";
            this.Prompt.ReadOnly = true;
            this.Prompt.Size = new System.Drawing.Size(342, 32);
            this.Prompt.TabIndex = 2;
            // 
            // StatusText
            // 
            this.StatusText.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.StatusText.BackColor = System.Drawing.SystemColors.Window;
            this.StatusText.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusText.Location = new System.Drawing.Point(271, 163);
            this.StatusText.Multiline = true;
            this.StatusText.Name = "StatusText";
            this.StatusText.ReadOnly = true;
            this.StatusText.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.StatusText.Size = new System.Drawing.Size(348, 151);
            this.StatusText.TabIndex = 4;
            // 
            // StatusLine
            // 
            this.StatusLine.Font = new System.Drawing.Font("Abel", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.StatusLine.Location = new System.Drawing.Point(271, 64);
            this.StatusLine.Name = "StatusLine";
            this.StatusLine.Size = new System.Drawing.Size(365, 54);
            this.StatusLine.TabIndex = 5;
            this.StatusLine.Text = "[Status line]";
            // 
            // btnAceptar
            // 
            this.btnAceptar.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.btnAceptar.BackColor = System.Drawing.Color.White;
            this.btnAceptar.BackgroundColor = System.Drawing.Color.White;
            this.btnAceptar.BorderColor = System.Drawing.Color.Black;
            this.btnAceptar.BorderRadius = 25;
            this.btnAceptar.BorderSize = 1;
            this.btnAceptar.FlatAppearance.BorderSize = 0;
            this.btnAceptar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnAceptar.Font = new System.Drawing.Font("Abel", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnAceptar.ForeColor = System.Drawing.Color.Black;
            this.btnAceptar.Location = new System.Drawing.Point(350, 332);
            this.btnAceptar.Name = "btnAceptar";
            this.btnAceptar.Size = new System.Drawing.Size(173, 48);
            this.btnAceptar.TabIndex = 32;
            this.btnAceptar.Text = "Aceptar";
            this.btnAceptar.TextColor = System.Drawing.Color.Black;
            this.btnAceptar.UseVisualStyleBackColor = false;
            this.btnAceptar.Click += new System.EventHandler(this.btnAceptar_Click);
            // 
            // CaptureForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 17F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(639, 391);
            this.Controls.Add(this.btnAceptar);
            this.Controls.Add(this.StatusLine);
            this.Controls.Add(this.StatusText);
            this.Controls.Add(this.StatusLabel);
            this.Controls.Add(this.Prompt);
            this.Controls.Add(this.Picture);
            this.Font = new System.Drawing.Font("Abel", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.MinimumSize = new System.Drawing.Size(464, 340);
            this.Name = "CaptureForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Registrar Huella";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.CaptureForm_FormClosed);
            this.Load += new System.EventHandler(this.CaptureForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.Picture)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox Picture;
        private System.Windows.Forms.TextBox Prompt;
        private System.Windows.Forms.TextBox StatusText;
        private System.Windows.Forms.Label StatusLine;
        private System.Windows.Forms.Label StatusLabel;
        private src.utils.Botones.CustomButton btnAceptar;
    }
}