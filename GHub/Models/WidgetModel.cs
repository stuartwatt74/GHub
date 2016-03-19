using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GHub.Models
{
    public class WidgetModel
    {
        public string Title { get; set; }
        [JsonProperty("sizeX")]
        public int SizeX { get; set; }
        [JsonProperty("sizeY")]
        public int SizeY { get; set; }
        [JsonProperty("row")]
        public int Row { get; set; }
        [JsonProperty("col")]
        public int Col { get; set; }
        public string Template { get; set; }
    }
}
