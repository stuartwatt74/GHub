using GHub.Controllers;
using GHub.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GHub.Hubs
{
    public class DisplayHub : Hub
    {
        public void ReceiveMessage(InputModel model)
        {
            TestController.Instance.ReceiveMessage(model);
        }
    }
}
