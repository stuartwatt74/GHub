using GHub.Models;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;

namespace GHub.Controllers
{
    public interface ISystemController
    {
        void SetHub<T>() where T : Hub;
        void Stop(bool immediate);
        
        void ReceiveMessage(IInputModel model);

        List<Model3D> GetModels();
    }
}