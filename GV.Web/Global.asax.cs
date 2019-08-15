using System.Web.Mvc;
using System.Web.Routing;
using GV.Core;

namespace GV.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var currentDir = Server.MapPath("~");
            GVConfig.Initialize(currentDir);
        }
    }
}
