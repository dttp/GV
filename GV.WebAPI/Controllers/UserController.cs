using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using GV.Core;
using GV.Model;
using GV.Services;

namespace GV.WebAPI.Controllers
{
    public class UserController : BaseController
    {
        [AcceptVerbs("POST")]
        public string Login(LoginRequest loginRequest)
        {
            var userSvc = new UserService(null);
            var password = CryptoUtil.DecodeFromBase64(loginRequest.Password);
            var user = userSvc.ValidateUser(loginRequest.UserName, password);
            return CryptoUtil.ConvertToBase64($"{user.Name}:{password}");
        }
    }
}