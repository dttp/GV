using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace GV.Core
{
    public class IdHelper
    {
        private const string Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJJKLMNOPQRSTUVWXYZ0123456789";        
        public static string Generate(int maxSize = 25)
        {            
            var chars = Alphabet.ToCharArray();
            byte[] data = new byte[1];
            RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
            crypto.GetNonZeroBytes(data);
            var size = maxSize;
            data = new byte[size];
            crypto.GetNonZeroBytes(data);
            StringBuilder result = new StringBuilder(size);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length - 1)]);                 
            }
            return result.ToString();
        }

    }
}
