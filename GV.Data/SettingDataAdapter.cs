using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Model;

namespace GV.Data
{
    public class SettingDataAdapter : BaseAdapter
    {
        private const string SP_SETTING_GETSETTING = "sp_setting_getsetting";
        private const string SP_SETTING_SETSETTING = "sp_setting_setsetting";

        public SettingDataAdapter(WebAPIContext context) : base (context)
        {
            
        }

        public string GetSetting(string id)
        {
            var p = new []
            {
                new SqlParameter("@id", id), 
            };
            return Call(SP_SETTING_GETSETTING, p, DataHelper.ReadSetting)?.Value;
        }

        public void SetSetting(Setting setting)
        {
            var p = new []
            {
                new SqlParameter("@id", setting.Id),
                new SqlParameter("@value", setting.Value),
            };
            Call(SP_SETTING_SETSETTING, p);
        }
    }
}
