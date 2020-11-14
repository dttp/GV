using GV.Model;
using GV.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GV.WebAPI.Controllers
{
    public class ContactController : BaseController
    {
        [AcceptVerbs("POST")]
        public HttpResponseMessage SendMessage(ContactUsInfo contactInfo)
        {
            return Execute(() =>
            {
                var svc = new ContactService(Context);
                svc.SendMessage(contactInfo);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }

    }
}