using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GV.Model;
using GV.Services;
using MultipartDataMediaFormatter.Infrastructure;

namespace GV.WebAPI.Controllers
{
    public class ProductController : BaseController
    {
        [AcceptVerbs("POST")]
        public Product Insert(Product p)
        {
            return Execute(() =>
            {
                var svc = new ProductService(Context);
                return svc.Insert(p);
            });
        }

        [AcceptVerbs("POST")]
        public HttpResponseMessage UploadPhotos(FormData formData)
        {
            return Execute(() =>
            {
                var svc = new ProductService(Context);
                svc.UploadPhotos(formData);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }

        [AcceptVerbs("GET")]
        public Product GetById(string id)
        {
            return Execute(() =>
            {
                var svc = new ProductService(Context);
                return svc.GetById(id);
            });
        }

        [AcceptVerbs("GET")]
        public PaginationResult<Product> Filter(int startIndex, int pageSize, string sortBy = "CreatedDate", bool sortAsc = false)
        {
            return Execute(() =>
            {
                var svc = new ProductService(Context);
                return svc.Filter(startIndex, pageSize, sortBy, sortAsc);
            });
        }

        [AcceptVerbs("POST")]
        public HttpResponseMessage GenerateProductRequestForm(string productId, Language lang)
        {
            return Execute(() =>
            {
                var svc = new ProductService(Context);
                svc.GenerateProductRequestForm(productId, lang);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }
    }
}
