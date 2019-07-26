using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using Utf8Json;

namespace GV.Core
{
    public static class JsonHelper
    {
        public static string ToJson(this object obj)
        {
            return JsonSerializer.ToJsonString(obj);
        }

        public static T ParseAs<T>(this string jsonString)
        {
            return JsonSerializer.Deserialize<T>(jsonString);
        }

        public static T ReadAs<T>(this HttpContent content)
        {
            using (var stream = content.ReadAsStreamAsync().Result)
            {
                return JsonSerializer.Deserialize<T>(stream);
            }
        }

        public static StringContent ToJsonStringContent(this object obj)
        {
            return new StringContent(obj.ToJson(), Encoding.UTF8, "application/json");
        }

    }
}
