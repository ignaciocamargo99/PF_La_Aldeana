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

        public frmLogin()
        {
            InitializeComponent();
        }

        private void btnEntrar_Click(object sender, EventArgs e)
        {
            login();
            if (isLogIn) this.Close();
            else lblInfo.Visible = true;
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void login()
        {
            isLogIn = false;
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
    }
}
