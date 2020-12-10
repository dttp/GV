using System;
using System.IO;

namespace GV.Core
{
    public class GVConfig
    {        
        private const string CONFIGURATION_FILE_CONFIG = @".\Config\gv.config";
        private static GVConfig _instance;
        private static bool _initialized = false;
        public static GVConfig Instance
        {
            get
            {
                if (!_initialized) throw new Exception("GVConfig is not initialized");
                return _instance;
            }
        }
        public string DBConnectionString { get; set; }
        public string WebAPIEndpoint { get; set; }
        public string ProductRegisterEmail { get; set; }

        public static void Initialize(string currentDir)
        {
            var configPath = Path.Combine(currentDir, CONFIGURATION_FILE_CONFIG);
            
            using (var fs = new FileStream(configPath, FileMode.Open, FileAccess.Read))
            {
                using (var reader = new StreamReader(fs))
                {
                    _instance = reader.ReadToEnd().ParseAs<GVConfig>();
                }
            }
            _initialized = true;
        }
    }
}
