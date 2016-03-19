using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GHub.Models
{
    public class DisplayModel : IDisplayModel
    {
        public string EventName { get; set; }
        public TimeModel Time { get; set; }        
    }
}
