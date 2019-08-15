using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public class ForbiddenException : System.Exception
    {
    public ForbiddenException(): base("The requested operation is forbidden") {}
    }
}
