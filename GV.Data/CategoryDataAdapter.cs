using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Model;

namespace GV.Data
{
    public class CategoryDataAdapter : BaseAdapter
    {
        private const string SP_CATEGORY_INSERT        = "SP_CATEGORY_INSERT";
        private const string SP_CATEGORY_UPDATE        = "SP_CATEGORY_UPDATE";
        private const string SP_CATEGORY_GETBYID       = "SP_CATEGORY_GETBYID";
        private const string SP_CATEGORY_GETBYPARENTID = "SP_CATEGORY_GETBYPARENTID";
        private const string SP_CATEGORY_DELETE        = "SP_CATEGORY_DELETE";

        public CategoryDataAdapter(WebAPIContext context) : base(context)
        {
            
        }

        public Category Insert(Category c)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar)          {Value = c.Id},
                new SqlParameter("@lang", SqlDbType.NVarChar)        {Value = c.Lang.ToString()},
                new SqlParameter("@name", SqlDbType.NVarChar)        {Value = c.Name},
                new SqlParameter("@description", SqlDbType.NVarChar) {Value = c.Description},
                new SqlParameter("@parentId", SqlDbType.NVarChar)    {Value = (object)c.ParentId ?? DBNull.Value},
            };
            Call(SP_CATEGORY_INSERT, p);
            return c;
        }

        public void Update(Category c)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar)          {Value = c.Id},
                new SqlParameter("@lang", SqlDbType.NVarChar)        {Value = c.Lang.ToString()},
                new SqlParameter("@name", SqlDbType.NVarChar)        {Value = c.Name},
                new SqlParameter("@description", SqlDbType.NVarChar) {Value = c.Description},
            };
            Call(SP_CATEGORY_UPDATE, p);
        }

        public void Delete(string id)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar) {Value = id}, 
            };
            Call(SP_CATEGORY_DELETE, p);
        }

        public Category GetById(string id, Language lang)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar) {Value = id}, 
                new SqlParameter("@lang", SqlDbType.NVarChar) {Value = lang.ToString()}, 
            };
            return Call(SP_CATEGORY_GETBYID, p, DataHelper.ReadCategories).FirstOrDefault();
        }

        public List<Category> GetByParentId(string parentId, Language lang)
        {
            var p = new []
            {
                new SqlParameter("@parentId", SqlDbType.NVarChar) {Value = (object) parentId ?? DBNull.Value}, 
                new SqlParameter("@lang", SqlDbType.NVarChar) {Value = lang.ToString()}, 
            };
            return Call(SP_CATEGORY_GETBYPARENTID, p, DataHelper.ReadCategories);
        }
    }
}
