using System.Web.Http;
using System.Web.Http.Cors;
using GV.WebAPI.Filters;
using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;

namespace GV.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            config.Filters.Add(new ExceptionFilter());
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}"
            );
            config.Routes.MapHttpRoute(name: "ping", routeTemplate: "ping",
                defaults: new {controller = "Base", action = "Ping"});
        }
    }
}
