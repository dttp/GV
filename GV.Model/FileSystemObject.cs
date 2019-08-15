using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public enum FileSytemObjectType
    {
        Folder,
        File
    }

    public class FileSystemObject
    {
        public FileSytemObjectType Type { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public long Size { get; set; }
        public string Url { get; set; }
    }
}
