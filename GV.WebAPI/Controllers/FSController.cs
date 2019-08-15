using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GV.Model;
using GV.Services;
using MultipartDataMediaFormatter.Infrastructure;

namespace GV.WebAPI.Controllers
{
    public class FSController : BaseController
    {
        [AcceptVerbs("GET")]
        public List<FileSystemObject> GetList(string path)
        {
            path = System.Web.HttpUtility.UrlDecode(path);
            return Execute(() => FSService.Instance.GetList(path));
        }

        [AcceptVerbs("POST")]
        public FileSystemObject CreateFolder(string path, string name)
        {
            path = System.Web.HttpUtility.UrlDecode(path);
            return Execute(() =>FSService.Instance.CreateFolder(path, name));
        }

        [AcceptVerbs("POST")]
        public HttpResponseMessage Upload(FormData formData)
        {
            return Execute(() =>
            {
                FSService.Instance.Upload(formData);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }

        [AcceptVerbs("DELETE")]
        public HttpResponseMessage Delete(string path)
        {
            return Execute(() =>
            {
                path = System.Web.HttpUtility.UrlDecode(path);
                FSService.Instance.Delete(path);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            });
        }
    }
}