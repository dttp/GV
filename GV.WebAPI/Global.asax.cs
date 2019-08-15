using System.IO;
using GV.Core;
using System.Web.Http;
using System.Web.Routing;
using GV.Services;

namespace GV.WebAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            var currentDir = Server.MapPath("~");
            GVConfig.Initialize(currentDir);
            var fsRootPath = Path.Combine(currentDir, "fs");
            FSService.Instance.Initialize(fsRootPath, currentDir);
        }
    }
}
