using System.Web.Mvc;
using System.Web.Routing;

namespace GV.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Home",
                url: "",
                defaults: new { controller = "Home", action = "Index"}
            );

            routes.MapRoute(
                name: "about",
                url: "about",
                defaults: new { controller = "About", action = "Index"}
            );

            routes.MapRoute(
                name: "contact",
                url: "contact",
                defaults: new { controller = "Contact", action = "Index"}
            );

            routes.MapRoute(
                name: "product",
                url: "product/{action}",
                defaults: new { controller = "Product", action = "Index"}
            );

            routes.MapRoute(
                name: "article",
                url: "article/{path}",
                defaults: new { controller = "Article", action = "Index", path=UrlParameter.Optional}
            );

            routes.MapRoute(
                name: "category",
                url: "category/{path}",
                defaults: new { controller = "Category", action = "Index", path=UrlParameter.Optional}
            );
        }
    }
}
