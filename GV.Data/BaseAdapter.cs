using System;
using System.Data;
using System.Data.SqlClient;
using GV.Core;
using GV.Model;

namespace GV.Data
{
    public class BaseAdapter 
    {
        public WebAPIContext Context {get; set;}

        public BaseAdapter(WebAPIContext context)
        {
            Context = context;
        }
        public string GetConnectionString()
        {
             return GVConfig.Instance.DBConnectionString;
        }

        public void Call(string spName, SqlParameter[] parameters)
        {
            SqlHelper.ExecuteNonQuery(GetConnectionString(), spName, parameters);
        }

        public T Call<T>(string spName, SqlParameter[] parameters)
        {
            return SqlHelper.ExecuteScalar<T>(GetConnectionString(), spName, parameters);
        }

        public T Call<T>(string spName, SqlParameter[] parameters, Func<IDataReader, T> reader)
        {
            return SqlHelper.ExecuteReader(GetConnectionString(), spName, parameters, reader);
        }
    }
}