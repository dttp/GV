using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public class Article
    {
        public string Id { get; set; }
        public Language Language { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Data { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }        
        public string Thumbnail { get; set; }
        public string CategoryId { get; set; }
    }
}
