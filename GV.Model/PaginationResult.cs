using System.Collections.Generic;

namespace GV.Model
{
    public class PaginationResult<T>
    {
        public long Total { get; set; }
        public List<T> Items { get; set; }
    }
}
