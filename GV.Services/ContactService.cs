using GV.Core;
using GV.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Services
{
    public class ContactService : BaseService
    {
        public ContactService(WebAPIContext context) : base(context)
        {

        }
        public void SendMessage(ContactUsInfo contactInfo)
        {
            Task.Run(() =>
            {
                var sb = new StringBuilder();
                sb.AppendLine("New message from customer.<br/>");
                sb.AppendLine($" Company: {contactInfo.Company} <br/>");
                sb.AppendLine($" Contact: {contactInfo.Contact} <br/>");
                sb.AppendLine($" Tel: {contactInfo.Phone} <br/>");
                sb.AppendLine($" Fax: {contactInfo.Fax} <br/>");
                sb.AppendLine($" Email: {contactInfo.Email} <br/>");
                sb.AppendLine($" Address: {contactInfo.Address} <br/>");
                sb.AppendLine($"--------------------------------<br/>");
                sb.AppendLine($"Message<br/>");
                sb.AppendLine(contactInfo.Message);

                EmailHelper.SendEmail("info@gvcompany.com", "New message from customer", sb.ToString(), null);
            });
        }
    }
}
