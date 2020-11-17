using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GV.Model;
using GV.Services;

namespace GV.WebAPI.Controllers
{
    public class ArticleController : BaseController
    {
        [AcceptVerbs("GET")]
        public Article GetById(string id, Language lang)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                return svc.GetById(id, lang);
            });
        }

        [AcceptVerbs("GET")]
        public PaginationResult<Article> GetByCategory(string catId, Language lang, bool createNew = false, bool detail = true, int startIndex = 0, int pageSize = 100, string sortBy = "LastModifiedDate", bool sortAsc = false)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                return svc.GetByCategory(catId, lang, createNew, detail, startIndex, pageSize, sortBy, sortAsc);
            });
        }

        [AcceptVerbs("DELETE")]
        public HttpResponseMessage Delete(string id)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                svc.Delete(id);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            });
        }

        [AcceptVerbs("DELETE")]
        public HttpResponseMessage DeleteByCategory(string catId)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                svc.DeleteByCategory(catId);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            });
        }

        [AcceptVerbs("POST")]
        public List<Article> Create(List<Article> articles)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                return svc.Insert(articles);
            });
        }

        [AcceptVerbs("POST")]
        public HttpResponseMessage Update(List<Article> articles)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                svc.Update(articles);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }

        [AcceptVerbs("GET")]
        public Breadcrumb GetBreadcrumb(string articleId, Language lang)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                return svc.GetBreadcrumb(articleId, lang);
            });
        }
    }
}
