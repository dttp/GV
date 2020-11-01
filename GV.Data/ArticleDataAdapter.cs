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
    public class ArticleDataAdapter : BaseAdapter
    {
        private const string SP_ARTICLE_INSERT = "SP_ARTICLE_INSERT";
        private const string SP_ARTICLE_UPDATE = "sp_article_update";
        private const string SP_ARTICLE_DELETE = "sp_article_delete";
        private const string SP_ARTICLE_GETBYID = "sp_article_getbyid";
        private const string SP_ARTICLE_GETBYCATEGORY = "sp_article_getbycategory";
        private const string SP_ARTICLE_DELETEBYCATEGORY = "sp_article_deleteByCategory";

        public ArticleDataAdapter(WebAPIContext context) : base (context)
        {
            
        }

        public Article GetById(string id, Language lang)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar) {Value = id},
                new SqlParameter("@lang", SqlDbType.NVarChar) {Value = lang.ToString()}
            };
            return Call<List<Article>>(SP_ARTICLE_GETBYID, p, DataHelper.ReadArticle).FirstOrDefault();
        }

        public List<Article> GetByCategory(string categoryId, Language lang)
        {
            var p = new []
            {
                new SqlParameter("@categoryId", SqlDbType.NVarChar) {Value = categoryId},
                new SqlParameter("@lang", SqlDbType.NVarChar) {Value = lang.ToString()}
            };
            return Call<List<Article>>(SP_ARTICLE_GETBYCATEGORY, p, DataHelper.ReadArticle);
        }

        public void Insert(Article article)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar) {Value = article.Id},
                new SqlParameter("@lang", SqlDbType.NVarChar) {Value = article.Language.ToString()},
                new SqlParameter("@name", SqlDbType.NVarChar) {Value = article.Name},
                new SqlParameter("@description", SqlDbType.NVarChar) {Value = article.Description},
                new SqlParameter("@data", SqlDbType.NVarChar) {Value = article.Data},
                new SqlParameter("@categoryId", SqlDbType.NVarChar) {Value = article.CategoryId},                
                new SqlParameter("@thumbnail", SqlDbType.NVarChar) {Value = article.Thumbnail}
            };
            Call(SP_ARTICLE_INSERT, p);
        }

        public void Update(Article article)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar) {Value = article.Id},
                new SqlParameter("@lang", SqlDbType.NVarChar) {Value = article.Language.ToString()},
                new SqlParameter("@name", SqlDbType.NVarChar) {Value = article.Name},
                new SqlParameter("@description", SqlDbType.NVarChar) {Value = article.Description},
                new SqlParameter("@data", SqlDbType.NVarChar) {Value = article.Data},
                new SqlParameter("@thumbnail", SqlDbType.NVarChar) {Value = article.Thumbnail}
            };
            Call(SP_ARTICLE_UPDATE, p);
        }

        public void Delete(string id)
        {
            var p = new []
            {
                new SqlParameter("@id", SqlDbType.NVarChar) {Value = id},
            };
            Call(SP_ARTICLE_DELETE, p);
        }

        public void DeleteByCategory(string catId)
        {
            var p = new []
            {
                new SqlParameter("@categoryId", SqlDbType.NVarChar) {Value = catId},
            };
            Call(SP_ARTICLE_DELETEBYCATEGORY, p);
        }
    }
}
