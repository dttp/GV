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
    public class CategoryService : BaseService
    {
        public CategoryService(WebAPIContext context) : base(context)
        {
            
        }

        public Category GetById(string id, Language lang)
        {
            var catDA = new CategoryDataAdapter(Context);
            return catDA.GetById(id, lang);
        }

        public List<Category> GetCategories(string parentId, Language lang)
        {
            var catDA = new CategoryDataAdapter(Context);
            return catDA.GetByParentId(parentId, lang);
        }

        public void Delete(string catId)
        {
            var cat = GetById(catId, Language.En);
            if (cat == null)
                throw new Exception($"Cannot find category with id: '{catId}'");

            Delete(cat);
        }

        private void Delete(Category cat)
        {
            var children = GetCategories(cat.Id, Language.En);
            if (children != null && children.Count > 0)
            {
                foreach(var subCat in children)
                {
                    Delete(subCat);
                }
            }
            var articleSvc = new ArticleService(Context);
            articleSvc.DeleteByCategory(cat.Id);

            var catDA = new CategoryDataAdapter(Context);
            catDA.Delete(cat.Id);
        }

        public List<CategoryTreeNode> GetSidebarCategories(Language lang)
        {
            var result = GetCategories(null, lang).Select(c => new CategoryTreeNode(c)).OrderBy(cat => cat.Id).ToList();
            foreach(var c in result)
            {
                c.Items = GetCategories(c.Id, lang).Select(subItem => new CategoryTreeNode(subItem)).OrderBy(cat => cat.Id).ToList();
            }

            return result;
        }

        public List<Category> Create(List<Category> categories)
        {
            var id = IdHelper.Generate();
            var catDA = new CategoryDataAdapter(Context);
            foreach(var c in categories)
            {
                c.Id = id;
                catDA.Insert(c);
            }
            return categories;
        }

        public void Update(List<Category> categories)
        {
            var catDA = new CategoryDataAdapter(Context);
            foreach (var c in categories)
            {
                catDA.Update(c);
            }
        }

        public List<Category> GetRootCategories(string currentCatId, Language lang)
        {
            var catDA = new CategoryDataAdapter(Context);
            while(true)
            {
                var cat = GetById(currentCatId, lang);
                if (string.IsNullOrEmpty(cat.ParentId)) return GetCategories(cat.Id, lang);
                currentCatId = cat.ParentId;
            }
        }

        public Breadcrumb GetBreadcrumb(string catId, Language lang)
        {
            var breadcrumb = new Breadcrumb {Items = new List<BreadcrumbItem>()};

            var homeItem = new BreadcrumbItem
            {
                Id = "home",
                Name = lang == Language.En ? "Home" : "Trang chủ"
            };

            breadcrumb.Items.Add(homeItem);

            var catList = new List<Category>();
            while(true)
            {
                var cat = GetById(catId, lang);
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
