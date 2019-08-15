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
        public List<Article> GetByCategory(string catId, Language lang)
        {
            return Execute(() =>
            {
                var svc = new ArticleService(Context);
                return svc.GetByCategory(catId, lang);
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
    }
}
