using System;
using System.IO;
using System.Text;
using NLog;
using NLog.Targets;

namespace GV.Core
{
    public class Log
    {
        private const string LOGGER_FOLDER = @"Logs\";
        private const string LOGS_CONFIG_FILE = @"Config\gvLog.Config";
        private static ILogger nLogger;
        private static NLog.Layouts.Layout _currentLogFileName;

        public static void Initialize(string currentDir, string loggerName)
        {
            var sPath = AppDomain.CurrentDomain.BaseDirectory;
            FileInfo fileInfo = new FileInfo(sPath);
            if (!string.IsNullOrEmpty(currentDir))
            {
                var pathLogConfigFile = Path.Combine(currentDir, LOGS_CONFIG_FILE);
                var pathLogsFolder = Path.Combine(currentDir, LOGGER_FOLDER);
                if (File.Exists(pathLogConfigFile))
                {
                    LogManager.Configuration = new NLog.Config.XmlLoggingConfiguration(pathLogConfigFile, true);
                    var target = (FileTarget)LogManager.Configuration.FindTargetByName(loggerName + "Target");
                    var targetFileName = ((NLog.Layouts.SimpleLayout)target.FileName).OriginalText.Replace("Logs/", "");
                    target.FileName = pathLogsFolder + targetFileName;

                    _currentLogFileName = target.FileName;

                    LogManager.ReconfigExistingLoggers();
                    nLogger = LogManager.GetLogger(loggerName);
                }
                else
                {
                    throw new Exception("Cant find file!");
                }
            }
            else
            {
                nLogger = LogManager.GetLogger("Default");
            }
        }


        public static void WriteInfo(string message)
        {
            if (nLogger != null && nLogger.IsInfoEnabled)
            {
                nLogger.Info($"{message}");
            }            
        }

        public static void WriteDebug(string message)
        {
            if (nLogger != null && nLogger.IsDebugEnabled)
            {
                nLogger.Debug($"{message}");
            }            
        }

        public static void WriteError(string message)
        {
            if (nLogger != null && nLogger.IsErrorEnabled)
            {
                nLogger.Error($"{message}");
            }
        }

        public static void WriteException(string message, Exception ex)
        {
            if (nLogger != null && nLogger.IsErrorEnabled)
            {
                nLogger.Error($"{message}. " + GetExceptionDetail(ex));
            }
        }

        public static string GetExceptionDetail(Exception ex)
        {
            var msg = new StringBuilder();
            msg.AppendLine($"Exception: {ex.Message}; ");
            Exception e = ex;
            while(e.InnerException != null)
            {
                e = e.InnerException;
                msg.AppendLine($"Inner Exception: {e.Message}");
            }
            msg.AppendLine($"Stacktrace: {ex.StackTrace}");
            return msg.ToString();
        }


        public static void WriteWarning(string message)
        {
            if (nLogger != null && nLogger.IsWarnEnabled)
            {
                nLogger.Warn($"{message}");
            }
        }

        public static void WriteFatal(string message)
        {
            if (nLogger != null && nLogger.IsFatalEnabled)
            {
                nLogger.Fatal($"{message}");
            }
        }

        public static void WriteTrace(string message)
        {
            if (nLogger != null && nLogger.IsTraceEnabled)
            {
                nLogger.Trace($"{message}");
            }
        }
    }
}