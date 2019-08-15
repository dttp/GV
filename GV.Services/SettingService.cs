using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Data;
using GV.Model;

namespace GV.Services
{
    public class SettingService: BaseService
    {
        public SettingService(WebAPIContext context) : base(context)
        {
            
        }

        public string GetSetting(string id)
        {
            var settingDA = new SettingDataAdapter(Context);
            return settingDA.GetSetting(id);
        }

        public void SetSetting(string id, string value)
        {
            var setting = new Setting
            {
                Id = id,
                Value = value
            };
            var settingDA = new SettingDataAdapter(Context);
            settingDA.SetSetting(setting);
        }

        public HomePageInfo GetHomePageInfo()
        {
            return GetSetting("HomePageInfo")?.ParseAs<HomePageInfo>();
        }

        public void SaveHomePageInfo(HomePageInfo homePageInfo)
        {
            SetSetting("HomePageInfo", homePageInfo.ToJson());
        }
    }
}
