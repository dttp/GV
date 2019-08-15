using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Data;
using GV.Model;

namespace GV.Services
{
    public class UserService : BaseService
    {
        public UserService(WebAPIContext context) : base(context)
        {
            
        }

        public User ValidateUser(string userName, string password)
        {
            var userDA = new UserDataAdapter(Context);
            var user = userDA.GetByName(userName);
            if (user == null) 
                throw new Exception($"Invalid user name or password");

            var encryptedPassword = CryptoUtil.ConvertToMD5(password);
            if (!encryptedPassword.Equals(user.Password))
                throw new Exception("Invalid user name or password");

            return user;
        }
    }
}
