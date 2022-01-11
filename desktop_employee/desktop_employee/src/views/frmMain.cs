using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
//using System.Runtime.InteropServices;
using desktop_employee.src.views.Employees;
using desktop_employee.src.views.RegisterAssistance;
using desktop_employee.src.entities;

namespace desktop_employee
{
    public partial class frmMain : Form
    {
        //se define el ancho del borde del form
        private int borderSize = 2;
        public frmMain()
        {
            InitializeComponent();
            //asignamos el valor del borde y el color celeste
            this.Padding = new Padding(borderSize);
            this.BackColor = Color.FromArgb(166, 222, 249);
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            //inicia la aplicación maximizada según el tamaño del monitor
            this.Location = Screen.PrimaryScreen.WorkingArea.Location;
            this.Size = Screen.PrimaryScreen.WorkingArea.Size;
            //Inicia el menú contraido
            ContraerMenu();

            //Inicia el formulario de asistencia
            //ibtnAsistencia_Click(null, e);
        }
        protected override void WndProc(ref Message m)
        {
            const int WM_NCCALCSIZE = 0x0083;//Standar Title Bar - Snap Window
            //Remove border and keep snap window
            if (m.Msg == WM_NCCALCSIZE && m.WParam.ToInt32() == 1)
            {
                return;
            }
            base.WndProc(ref m);
        }

        private void ibtnMinimizar_Click(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;
        }

        private void ibtnClose_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void ibtnMenu_Click(object sender, EventArgs e)
        {
            ContraerMenu();
        }

        private void ContraerMenu()
        {
            if (this.pnlMenu.Width > 200)
            {
                pnlMenu.Width = 100;
                pbxLogo.Visible = false;
                ibtnMenu.Dock = DockStyle.Top;
                foreach (Button menuButton in pnlMenu.Controls.OfType<Button>())
                {
                    menuButton.Text = "";
                    menuButton.ImageAlign = ContentAlignment.MiddleCenter;
                    menuButton.Padding = new Padding(0);
                }
            }
            else
            {
                pnlMenu.Width = 216;
                pbxLogo.Visible = true;
                ibtnMenu.Dock = DockStyle.None;
                foreach (Button menuButton in pnlMenu.Controls.OfType<Button>())
                {
                    menuButton.Text = menuButton.Tag.ToString();
                    menuButton.ImageAlign = ContentAlignment.MiddleLeft;
                    menuButton.Padding = new Padding(10, 0, 0, 0);
                }
            }
        }

        private void ibtnEmpleados_Click(object sender, EventArgs e)
        {
            frmEmployees employees = new();
            lblTitulo.Text = "EMPLEADOS";
            employees.PnlPadre = pnlDesktop;
            OpenForm(employees);
        }

        private void ibtnAsistencia_Click(object sender, EventArgs e)
        {
            frmAssistanceFinger assistanceFinger = new();
            lblTitulo.Text = "ASISTENCIA con HUELLA";
            OpenForm(assistanceFinger);


            
        }

        private void ibtnAsistenciaDNI_Click(object sender, EventArgs e)
        {
            for (int i = 1; i <= Application.OpenForms.Count; i++) {
                //string nombreForm = Application.OpenForms[i].ToString();
                Application.OpenForms[i].Close();
            }
            MessageBox.Show("form abiertos" + Convert.ToString(Application.OpenForms.Count));
            frmAssistanceDNI assitenceDNI = new();
            lblTitulo.Text = "ASISTENCIA con DNI";
            //pasar tabla
            OpenForm(assitenceDNI);
        }

        private void OpenForm(Form form)
        {
            if (this.pnlDesktop.Controls.Count > 0)
                this.pnlDesktop.Controls.RemoveAt(0);
            form.TopLevel = false;
            form.Dock = DockStyle.Fill;
            //this.pnlDesktop.Tag = form;
            pnlDesktop.Controls.Add(form);
            form.Show();
        }

    }
}
