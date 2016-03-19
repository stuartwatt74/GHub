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
        private DateTime _startTime;
        private double _f;
        public TestController()
        {
            _startTime = DateTime.Now;
            _f = 0;
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

            _f += 0.01;

            DisplayModel model = new DisplayModel()
            {
                EventName = "test-display-update",
                Time = new TimeModel
                {
                    Hour = now.Hour,
                    Minute = now.Minute,
                    Second = now.Second,
                    Millisecond = now.Millisecond
                }                
            };
            this.BroadcastMessage(model);

        }

        public override void ReceiveMessage(IInputModel model)
        {
            InputModel m = (InputModel)model;

            if (m.EventName == "reset")
                _startTime = DateTime.Now;
        }
    }
}
