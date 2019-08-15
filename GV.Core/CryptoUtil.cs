using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GV.Core
{
    public class CryptoUtil
    {
        public static string ConvertToMD5(string input)
        {
            var hash = new StringBuilder();
            var md5Provider = new MD5CryptoServiceProvider();
            var bytes = md5Provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            foreach (byte t in bytes)
            {
                hash.Append(t.ToString("x2"));
            }
            return hash.ToString();
        }

        public static string ComputeSHA256Hash(string input)
        {
            var hash = new StringBuilder();
            var hashProvider = new SHA256CryptoServiceProvider();
            var bytes = hashProvider.ComputeHash(new UTF8Encoding().GetBytes(input));
            foreach (byte b in bytes)
            {
                hash.Append(b.ToString("x2"));
            }

            return hash.ToString();
        }

        public static string ConvertToBase64(string data)
        {
            byte[] toEncodeAsBytes = Encoding.ASCII.GetBytes(data);
            string returnValue = System.Convert.ToBase64String(toEncodeAsBytes);
            return returnValue;
        }

        public static string DecodeFromBase64(string data)
        {
            byte[] encodedDataAsBytes = System.Convert.FromBase64String(data);
            string returnValue = Encoding.ASCII.GetString(encodedDataAsBytes);
            return returnValue;
        }
    }
}
