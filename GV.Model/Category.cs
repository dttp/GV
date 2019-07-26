using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public class Category
    {
        public string Id { get; set; }
        public Language Lang { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ParentId { get; set; }
        public List<Category> SubCategories { get; set; }
    }
}
