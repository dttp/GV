using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Model;

namespace GV.Data
{
    public class UserDataAdapter : BaseAdapter
    {
        private const string SP_USER_GETBYNAME = "sp_user_getbyname";

        public UserDataAdapter(WebAPIContext context) : base(context)
        {
            
        }

        public User GetByName(string name)
        {
            var p = new []
            {
                new SqlParameter("@name", SqlDbType.NVarChar) {Value = name}
            };

            return Call<User>(SP_USER_GETBYNAME, p, DataHelper.ReadUser);
        }
    }
}
