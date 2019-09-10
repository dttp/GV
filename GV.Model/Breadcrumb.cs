using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public class Breadcrumb
    {
        public List<BreadcrumbItem> Items { get; set; }
    }

    public class BreadcrumbItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

}
