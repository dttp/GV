using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
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

        public PaginationResult<Article> GetByCategory(string catId, Language lang, bool createNew = false, bool detail = true, int startIndex = 0, int pageSize = 100, string sortBy = "LastModifiedDate", bool sortAsc = true, bool recursive = false)
        {
            var articleDA = new ArticleDataAdapter(Context);
            var articles = articleDA.GetByCategory(catId, lang, detail, startIndex, pageSize, sortBy, sortAsc, recursive);
            if (articles.Total == 0 && createNew)
            {
                var newArticles = new List<Article>()
                {
                    new Article
                    {
                        CategoryId = catId,
                        Language = Language.En,
                        Name = "Default article",
                        Description = "",
                        Thumbnail = string.Empty
                    },
                    new Article
                    {
                        CategoryId = catId,
                        Language = Language.Vn,
                        Name = "Default article",
                        Description = "",
                        Thumbnail = string.Empty
                    },
                };
                articles = new PaginationResult<Article>
                {
                    Items = Insert(newArticles),
                    Total = 1
                };
            }

            return articles;
        }

        public PaginationResult<Article> Search(string keyword, Language lang, int startIndex, int pageSize)
        {
            var adapter = new ArticleDataAdapter(Context);
            return adapter.Search(keyword, lang, startIndex, pageSize);
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
