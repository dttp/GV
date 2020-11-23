using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
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
                    Lang = (Language)Enum.Parse(typeof(Language), reader["Lang"].ToString())
                };
                result.Add(c);
            }
            return result;
        }

        public static User ReadUser(IDataReader reader)
        {
            var result = new List<User>();
            while(reader.Read())
            {
                var u = new User
                {
                    Id = reader["Id"].ToString(),
                    Name = reader["Name"].ToString(),
                    Password = reader["Password"].ToString()
                };
                result.Add(u);
            }
            return result.FirstOrDefault();
        }

        private static bool ColumnExists(IDataReader reader, string columnName)
        {
            for (int i = 0; i < reader.FieldCount; i++)
            {
                if (reader.GetName(i).Equals(columnName, StringComparison.InvariantCultureIgnoreCase))
                {
                    return true;
                }
            }

            return false;
        }

        public static PaginationResult<Article> ReadArticle(IDataReader reader)
        {
            var result = new PaginationResult<Article>
            {
                Items = new List<Article>(),
                Total = 0
            };

            while(reader.Read())
            {
                bool hasDataColumn = ColumnExists(reader, "Data");
                bool hasCountColumn = ColumnExists(reader, "Count");
                var data = string.Empty;
                if (hasDataColumn) data = reader["Data"].ToString();

                var a = new Article
                {
                    Id = reader["Id"].ToString(),
                    Name = reader["Name"].ToString(),
                    Description = reader["Description"].ToString(),
                    Language = (Language)Enum.Parse(typeof(Language), reader["Lang"].ToString()),
                    CategoryId = reader["CategoryId"].ToString(),
                    CreatedDate = DateTime.Parse(reader["CreatedDate"].ToString()),
                    LastModifiedDate = DateTime.Parse(reader["LastModifiedDate"].ToString()),
                    Data = data,
                    Thumbnail = reader["Thumbnail"].ToString(),
                };
                if (hasCountColumn) result.Total = Convert.ToInt32(reader["Count"]);
                result.Items.Add(a);
            }
            return result;
        }

        public static PaginationResult<Product> ReadProduct(IDataReader reader)
        {
            var result = new PaginationResult<Product>
            {
                Items = new List<Product>(),
                Total = 0
            };

            while (reader.Read())
            {
                var p = new Product
                {
                    Id = reader["Id"].ToString(),
                    Name = reader["Name"].ToString(),
                    Type = reader["Type"].ToString(),
                    Manufacturer = reader["Manufacturer"].ToString(),
                    PlaceOfManufacturing = reader["PlaceOfManufacturing"].ToString(),
                    TechnicalSpecs = reader["TechnicalSpecs"].ToString().ParseAs<List<string>>(),
                    ManufacturerISO9000CertNumber = reader["ManufacturerISO9000CertNumber"].ToString(),
                    ISO9000CertVerifyLink = reader["ISO9000CertVerifyLink"].ToString(),
                    SerialPhotos = reader["SerialPhotos"].ToString().ParseAs<List<string>>(),
                    Capacity = reader["Capacity"].ToString(),
                    Model = reader["Model"].ToString(),
                    Others = reader["Others"].ToString(),
                    SpuriousEmissionLevel = reader["SpuriousEmissionLevel"].ToString(),
                    WorkingFrequency = reader["WorkingFrequency"].ToString(),
                    ImporterDomesticManufacturer = new Company
                    {
                        Name = reader["ImporterName"].ToString(),
                        Address = reader["ImporterAddress"].ToString(),
                        Phone = reader["ImporterPhone"].ToString(),
                        Tax = reader["ImporterTax"].ToString(),
                        Fax = reader["ImporterFax"].ToString()
                    },
                    CreatedDate = DateTime.Parse(reader["CreatedDate"].ToString())
                };
                result.Items.Add(p);
                bool hasCountColumn = ColumnExists(reader, "Count");
                if (hasCountColumn)
                    result.Total = int.Parse(reader["Count"].ToString());
                else
                    result.Total = result.Items.Count;
            }

            return result;
        }

        public static Setting ReadSetting(IDataReader reader)
        {
            var settings = new List<Setting>();
            while(reader.Read())
            {
                var s = new Setting
                {
                    Id =reader["Id"].ToString(),
                    Value = reader["Value"].ToString()
                };
                settings.Add(s);
            }
            
            return settings.FirstOrDefault();
        }
    }
}
