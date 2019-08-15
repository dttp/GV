using GV.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Services
{
    public class BaseService
    {
        public WebAPIContext Context { get; }

        public BaseService(WebAPIContext context)
        {
            Context = context;
        }
    }
}
