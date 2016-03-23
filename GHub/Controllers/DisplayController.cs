using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace GHub.Controllers
{
    [RoutePrefix("api/Display")]
    public class DisplayController : ApiController
    {
        [Authorize]
        [Route("Models")]
        [HttpGet]
        public IHttpActionResult Models()
        {            
            return Ok(TestController.Instance.GetModels());
        }
    }
}
