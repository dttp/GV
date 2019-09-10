using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Data;
using GV.Model;

namespace GV.Services
{
    public class ArticleService : BaseService
    {
        public ArticleService(WebAPIContext context) : base(context)
        {
            
        }

        public void DeleteByCategory(string catId)
        {
            var articleDA = new ArticleDataAdapter(Context);
            articleDA.DeleteByCategory(catId);
        }

        public void Delete(string id)
        {
            var articleDA = new ArticleDataAdapter(Context);
            articleDA.Delete(id);
        }

        public Article GetById(string id, Language lang)
        {
            var articleDA = new ArticleDataAdapter(Context);
            return articleDA.GetById(id, lang);
        }

        public List<Article> GetByCategory(string catId, Language lang)
        {
            var articleDA = new ArticleDataAdapter(Context);
            return articleDA.GetByCategory(catId, lang);
        }

        public List<Article> GetAllByCategory(string catId, Language lang)
        {
            var articles = new List<Article>();

            articles.AddRange(GetByCategory(catId, lang));

            var catDA = new CategoryDataAdapter(Context);
            var subCat = catDA.GetByParentId(catId, lang);

            foreach (var category in subCat)
            {
                articles.AddRange(GetAllByCategory(category.Id, lang));
            }
            
            return articles;
        }

        public List<Article> Insert(List<Article> articles)
        {
            var id = IdHelper.Generate();
            var articleDA = new ArticleDataAdapter(Context);
            foreach (var article in articles)
            {
                article.Id = id;
                articleDA.Insert(article);
            }
            return articles;
        }

        public void Update(List<Article> articles)
        {
            var articleDA = new ArticleDataAdapter(Context);
            foreach (var article in articles)
            {
                articleDA.Update(article);
            }
        }

        public Breadcrumb GetBreadcrumb(string articleId, Language lang)
        {
            var breadcrumb = new Breadcrumb();
            var article = GetById(articleId, lang);
            breadcrumb.Items = new List<BreadcrumbItem>();

            var homeItem = new BreadcrumbItem
            {
                Id = "home",
                Name = lang == Language.En ? "Home" : "Trang chủ"
            };

            breadcrumb.Items.Add(homeItem);
            var catSvc = new CategoryService(Context);

            var catList = new List<Category>();
            string catId = article.CategoryId;
            while(true)
            {
                var cat = catSvc.GetById(catId, lang);
                catList.Insert(0, cat);
                if (string.IsNullOrEmpty(cat.ParentId))
                {
                    break;
                } 
                
                catId = cat.ParentId;
            }
            foreach(var cat in catList)
            {
                breadcrumb.Items.Add(new BreadcrumbItem
                {
                    Id = cat.Id,
                    Name = cat.Name
                });
            }
            return breadcrumb;
        }
    }
}
