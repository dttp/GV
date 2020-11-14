using GV.Model;
using System.Net.Mail;

namespace GV.Core
{
    public static class EmailHelper
    {
        public static void SendEmail(string to, string subject, string body, MailServer mailServer)
        {
            if (mailServer == null)
            {
                mailServer = new MailServer()
                {
                    Email = "admin@gvcompany.com",
                    Password = IdHelper.Encode("thuylien"),
                    EnableSSL = true,
                    Host = "smtp.gmail.com",
                    Port = 587,
                    TimeOut = 100
                };
            }
            MailMessage mail = new MailMessage(mailServer.Email, to)
            {
                IsBodyHtml = true,
                Subject = subject,
                Body = body
            };
            SmtpClient client = new SmtpClient(mailServer.Host, mailServer.Port)
            {
                DeliveryMethod = SmtpDeliveryMethod.Network,
                EnableSsl = mailServer.EnableSSL,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential(mailServer.Email, IdHelper.Decode(mailServer.Password))
            };

            client.Send(mail);
        }
    }
}
