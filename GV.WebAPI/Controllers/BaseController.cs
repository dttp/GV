using GV.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using GV.Services;

namespace GV.WebAPI.Controllers
{
    public class BaseController : ApiController
    {
        public WebAPIContext Context { get; set; }

        [AcceptVerbs("GET")]
        public string Ping()
        {
            return "Pong";
        }

        private void GetContext()
        {
            Context = new WebAPIContext();
            try
            {
                if (string.IsNullOrEmpty(Request.Headers.Authorization.Scheme) || 
                    !Request.Headers.Authorization.Scheme.Equals("Basic", StringComparison.CurrentCultureIgnoreCase))
                    throw new ForbiddenException();
                string[] userInfo;
                try
                {
                    var authorizeInfo = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                    userInfo = authorizeInfo.Split(':');
                    if (userInfo.Length != 2) 
                        userInfo = null;

                    if (userInfo == null)
                        throw new ForbiddenException();
                }
                catch (Exception)
                {
                    throw new ForbiddenException();
                }
            
                var userSvc = new UserService(null);
                var user = userSvc.ValidateUser(userInfo[0], userInfo[1]);
                Context.User = user;
            }
            catch (Exception)
            {
                if (Request.Headers.Contains("X-GV-Context"))
                {
                    var gvContext = Request.Headers.GetValues("X-GV-Context").FirstOrDefault();
                    if (gvContext != null && gvContext.Equals("web", StringComparison.CurrentCultureIgnoreCase))
                    {
                        Context.User = null;
                    } 
                    else
                    {
                        throw;
                    }
                }
            }
            
        }

        public TResult Execute<TResult>(Func<TResult> action)
        {
            try
            {
                GetContext();
                return action();
            }
            catch (Exception e)
            {
                
                throw;
            }
            finally
            {

            }
        }
    }
}