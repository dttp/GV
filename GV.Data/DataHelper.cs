using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Model;

namespace GV.Data
{
    public class DataHelper
    {
        public static List<Category> ReadCategories(IDataReader reader)
        {
            var result = new List<Category>();
            while(reader.Read())
            {
                var c = new Category
                {
                    Id = reader["Id"].ToString(),
                    Name = reader["Name"].ToString(),
                    Description = reader["Description"].ToString(),
                    ParentId = reader["ParentId"].ToString(),
                    SubCategories = new List<Category>(),
                    Lang = (Language)Enum.Parse(typeof(Language), reader["Lang"].ToString())
                };
                result.Add(c);
            }
            return result;
        }
    }
}
