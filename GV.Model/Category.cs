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
    }

    public class CategoryTreeNode : Category
    {
        public List<CategoryTreeNode> Items { get; set; }

        public CategoryTreeNode()
        {

        }

        public CategoryTreeNode(Category c)
        {
            this.Id = c.Id;
            this.Lang = c.Lang;
            this.Name = c.Name;
            this.Description = c.Description;
            this.ParentId = c.ParentId;
            this.Items = new List<CategoryTreeNode>();
        }
    }
}
