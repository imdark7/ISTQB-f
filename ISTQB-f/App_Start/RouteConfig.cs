using System.Web.Mvc;
using System.Web.Routing;

namespace ISTQB_f
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Training",
                url: "Training",
                defaults: new { controller = "Training", action = "NextQuestion" }
            );

            routes.MapRoute(
                name: "Exam",
                url: "Exam",
                defaults: new { controller = "Exam", action = "Init" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
