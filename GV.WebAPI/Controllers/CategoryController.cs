using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GV.Model;
using GV.Services;

namespace GV.WebAPI.Controllers
{
    public class CategoryController : BaseController
    {
        [AcceptVerbs("GET")]
        public Category GetById(string id, Language lang)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                return svc.GetById(id, lang);
            });
        }

        [AcceptVerbs("GET")]
        public List<Category> GetCategories(string parentId, Language lang)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                return svc.GetCategories(parentId, lang);
            });
        }

        [AcceptVerbs("GET")]
        public List<Category> GetRootCategories(string currentCatId, Language lang)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                return svc.GetRootCategories(currentCatId, lang);
            });
        }

        [AcceptVerbs("DELETE")]
        public HttpResponseMessage Delete(string catId)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                svc.Delete(catId);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            });
        }

        [AcceptVerbs("POST")]
        public List<Category> Create(List<Category> categories)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                return svc.Create(categories);
            });
        }

        [AcceptVerbs("POST")]
        public HttpResponseMessage Update(List<Category> categories)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                svc.Update(categories);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }

        [AcceptVerbs("GET")]
        public Breadcrumb GetBreadcrumb(string catId, Language lang)
        {
            return Execute(() =>
            {
                var svc = new CategoryService(Context);
                return svc.GetBreadcrumb(catId, lang);
            });
        }
    }
}