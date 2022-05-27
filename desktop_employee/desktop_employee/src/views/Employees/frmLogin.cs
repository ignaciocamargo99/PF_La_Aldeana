using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using desktop_employee.src.entities;
using Newtonsoft.Json;

namespace desktop_employee.src.views.Employees
{
    public partial class frmLogin : Form
    {
        config config = new();
        bool isLogIn = false;
        dynamic responseLogin;
        bool isError = false;

        public frmLogin()
        {
            InitializeComponent();
        }

        private void btnEntrar_Click(object sender, EventArgs e)
        {
            if (txtUser.Text.Length > 0 && txtPassword.Text.Length > 0)
            {
                login();
                if (isLogIn && (responseLogin.data.permissions != 0 || responseLogin.data.permissions != -1)) this.Close();
            }
            else
            {
                MessageBox.Show("Ingrese un usuario y una contraseña", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnCancelar_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void login()
        {
            string userInput = txtUser.Text;
            string passwordInput = txtPassword.Text;
            var urlGet = config.getUrlPort() + "/api/loginDesktop?user="+userInput+"&pass="+passwordInput;
            var requestGet = (HttpWebRequest)WebRequest.Create(urlGet);
            requestGet.Method = "GET";
            requestGet.ContentType = "application/json";
            requestGet.Accept = "application/json";
            try
            {
                using WebResponse response = requestGet.GetResponse();
                using Stream strReader = response.GetResponseStream();
                if (strReader == null) return;
                using StreamReader objReader = new StreamReader(strReader);
                string responseBody = objReader.ReadToEnd();
                responseLogin = JsonConvert.DeserializeObject(responseBody);             
            }
            catch (WebException ex)
            {
                isError = true;
            }
            if (isError)
            {
                MessageBox.Show("Problema en el servidor. Reintente de nuevo !", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtPassword.Clear();
                txtUser.Clear();
            }
            else
            {                
                if (Convert.ToBoolean(responseLogin.data.isLoginOk))
                {
                    if (responseLogin.data.permissions == 0 || responseLogin.data.permissions == -1)
                    {
                        MessageBox.Show("El usuario no cuenta con los permisos necesarios...", "ERROR !!!", MessageBoxButtons.OK, MessageBoxIcon.Error);
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
            }
        }

        public bool isLogin()
        {
            return isLogIn;
        }

        public int permissions()
        {
            return responseLogin.data.permissions;
        }

        private void frmLogin_Load(object sender, EventArgs e)
        {

        }
    }
}
