using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using desktop_employee.src.entities;

namespace desktop_employee.src.views.Employees
{
    public partial class frmLogin : Form
    {
        Reply oReply = new Reply();
        config config = new();
        bool isLogIn = false;
        dynamic responseLogin;
        int permisos = 0;

        public frmLogin()
        {
            InitializeComponent();
        }

        private void btnEntrar_Click(object sender, EventArgs e)
        {
            login();
            if (isLogIn && permisos != 0) this.Close();
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void login()
        {
            // mandamos usuario y contraseña y verificamos si son correctas
            var user = "joa";
            var pass = "123";
            string userInput = txtUser.Text;
            string passwordInput = txtPassword.Text;
            // recibimos los permisos (en tabla id 9) para administrar huellas
            // 1 = ver
            // 2 = ver/registrar
            // 3 = todos
            // 0 = nada
            permisos = Convert.ToInt32(txtPerm.Text);
            // si esto todo ok, retornamos true, sino no
            if (user == userInput && pass == passwordInput)
            {
                if (permisos == 0)
                {
                    MessageBox.Show("El usuario no cuenta con los permisos necesarios...");
                    txtPassword.Clear();
                    txtUser.Clear();
                    lblInfo.Visible = false;
                }
                else isLogIn = true;
            }
            else
            {
                lblInfo.Visible = true;
                txtPassword.Clear();
            }
            
            //try
            //{
            //    //Login login = new()
            //    //{
            //    //    user = txtUser.Text,
            //    //    password = txtPassword.Text,
            //    //};
            //    //oReply = await Consumer.Execute<Login>(config.getUrlPort() + "/api/loginDesktop", methodHttp.POST, login);        

            //}
            //catch (Exception ex)
            //{
            //    MessageBox.Show(ex.Message);
            //}
        }

        public bool isLogin()
        {
            return isLogIn;
        }

        public int permissions()
        {
            return permisos;
        }
    }
}
