using System.Web.Mvc;
using System.Web.Optimization;

namespace Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder
{
    public class VisitingOrderAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "VisitingOrder";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "VisitingOrder_default",
                "VisitingOrder/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );

            RegisterBundles(BundleTable.Bundles);
        }

        private void RegisterBundles(BundleCollection bundles)
        {
            Claro.SIACU.App.VisitingOrder.Areas.VisitingOrder.Utils.BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}