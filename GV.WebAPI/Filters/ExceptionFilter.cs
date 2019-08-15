using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;
using GV.Model;

namespace GV.WebAPI.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception == null) return;
            var error = new ApiError();
            var httpStatusCode = HttpStatusCode.InternalServerError;

            error.Message = context.Exception.GetBaseException().Message;
            error.StackTrace = context.Exception.StackTrace;

            if (context.Exception is ForbiddenException)
            {
                httpStatusCode = HttpStatusCode.Forbidden;
            }

            context.Response = context.Request.CreateResponse<ApiError>(httpStatusCode, error);
        }
    }
}