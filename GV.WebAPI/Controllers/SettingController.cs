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
    public class SettingController : BaseController
    {

        [AcceptVerbs("GET")]
        public HomePageInfo GetHomePageInfo()
        {
            return Execute(() =>
            {
                var svc = new SettingService(Context);
                return svc.GetHomePageInfo();
            });
        }

        [AcceptVerbs("POST")]
        public HttpResponseMessage SaveHomePageInfo(HomePageInfo homePageInfo)
        {
            return Execute(() =>
            {
                var svc = new SettingService(Context);
                svc.SaveHomePageInfo(homePageInfo);
                return Request.CreateResponse(HttpStatusCode.OK);
            });
        }
    }
}