using BulletSharp;
using GHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GHub.Controllers
{
    public class TestController : SystemController
    {        
        SimController _sim;

        public TestController()
        {
            _sim = new SimController(60);
        }

        public static new ISystemController Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new TestController();
                }
                return _instance;
            }
        }

        protected override void OnTimer()
        {
            DateTime now = DateTime.Now;

            _sim.Step();

            DisplayModel model = new DisplayModel()
            {
                EventName = "test-display-update",
                Time = new TimeModel
                {
                    Hour = now.Hour,
                    Minute = now.Minute,
                    Second = now.Second,
                    Millisecond = now.Millisecond
                },                
                Models = _sim.GetModels(),
            };
            this.BroadcastMessage(model);

        }

        public override void ReceiveMessage(IInputModel model)
        {
            InputModel m = (InputModel)model;

            if (m.EventName == "reset")
            {
                _sim.Dispose();
                _sim = new SimController(60);
            }
        }

        public override List<Model3D> GetModels()
        {
            List<Model3D> models = null;
            if (_sim != null)
            {
                 models = _sim.GetModels();
            }
            return models;
        }
    }
}
