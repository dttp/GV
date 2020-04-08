using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Model;
using MultipartDataMediaFormatter.Infrastructure;

namespace GV.Services
{
    public class FSService
    {
        private static FSService _instance;
        public static FSService Instance => _instance ?? (_instance = new FSService());

        public string RootFolder { get; set; }
        private string ServerPath { get; set; }

        public void Initialize(string rootFolder, string serverPath)
        {
            RootFolder = rootFolder;
            ServerPath = serverPath;
            if (!Directory.Exists(rootFolder))
            {
                Directory.CreateDirectory(rootFolder);
            }
        }

        public List<FileSystemObject> GetList(string path = "")
        {
            var folder = string.IsNullOrEmpty(path) ? RootFolder : Path.Combine(RootFolder, path);
            var dirInfo = new DirectoryInfo(folder);
            if (!dirInfo.Exists) throw new Exception("Folder does not exists");
            var result = dirInfo.GetDirectories()
                .Select(dir => new FileSystemObject
                {
                    Type = FileSytemObjectType.Folder,
                    Name = dir.Name,
                    Path = dir.FullName.Replace(RootFolder, string.Empty),
                    Size = 0,
                    Url = GetWebPath(dir.FullName)
                })
                .ToList();

            foreach(var file in dirInfo.GetFiles())
            {                
                var fso = new FileSystemObject
                {
                    Name = file.Name,
                    Path = file.FullName.Replace(RootFolder, string.Empty),
                    Size = file.Length,
                    Type = FileSytemObjectType.File,
                    Url = GetWebPath(file.FullName)
                };
                result.Add(fso);
            }

            return result;
        }

        public FileSystemObject CreateFolder(string path, string name)
        {
            var folderPath = string.IsNullOrEmpty(path) ? Path.Combine(RootFolder, name) : Path.Combine(RootFolder, path, name);
            var dirInfo = new DirectoryInfo(folderPath);
            if (dirInfo.Exists) throw new Exception($"Folder {name} is already exists");
            dirInfo.Create();

            return new FileSystemObject
            {
                Name = name,
                Path = dirInfo.FullName.Replace(RootFolder, string.Empty),
                Size = 0,
                Type = FileSytemObjectType.Folder,
                Url = GetWebPath(dirInfo.FullName)
            };
        }

        public void Upload(FormData formData)
        {
            var path = formData.Fields.Find(f => f.Name.Equals("Path", StringComparison.CurrentCultureIgnoreCase))?.Value ?? string.Empty;
            
            var folderPath = string.IsNullOrEmpty(path) ? RootFolder  : Path.Combine(RootFolder, path);
            foreach(var file in formData.Files)
            {
                var filePath = Path.Combine(folderPath, file.Value.FileName);
                File.WriteAllBytes(filePath, file.Value.Buffer);
            }
        }

        private string GetWebPath(string localPath)
        {
            localPath = localPath.Replace(ServerPath, "");
            localPath = localPath.Replace("\\", "/");
            localPath = GVConfig.Instance.WebAPIEndpoint + (localPath.StartsWith("/") ? localPath : "/" + localPath);
            return localPath;
        }

        public void Delete(string path)
        {
            if (path.StartsWith("\\")) path = path.Substring(1);
            var filePath = Path.Combine(RootFolder, path);
            File.Delete(filePath);
        }
    }
}
