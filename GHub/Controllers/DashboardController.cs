using GHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace GHub.Controllers
{
    [RoutePrefix("api/Dashboard")]
    public class DashboardController : ApiController
    {
        [Authorize]
        [Route("Widgets")]
        [HttpGet]
        public IHttpActionResult Widgets()
        {
            List<WidgetModel> widgets = new List<WidgetModel>()
            {
                new WidgetModel()
                {
                    Title = "Clock",
                    SizeX = 1,
                    SizeY = 1,
                    Col = 0,
                    Row = 0,
                    Template = "<clock></clock>"
                },
                new WidgetModel()
                {
                    Title = "Clock 2",
                    SizeX = 1,
                    SizeY = 1,
                    Col = 1,
                    Row = 0,
                    Template = "<clock></clock>"
                }
            };

            return Ok(widgets);
        }
        
    }
}
