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
    }
}
