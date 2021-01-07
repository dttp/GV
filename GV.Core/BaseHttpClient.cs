using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace GV.Core
{
	public class BaseHttpClient
	{
		public AuthenticationHeaderValue Authorization { get; set; }

        public Func<AuthenticationHeaderValue> AuthorizationResolver { get; set; }

		public T Get<T>(string url)
		{
			var request = CreateRequest(url, HttpMethod.Get);
			return SendRequest<T>(request);
		}

	    public HttpResponseMessage Get(string url)
	    {
	        var request = CreateRequest(url, HttpMethod.Get);
	        return SendRequest(request);
	    }

        public HttpResponseMessage GetWithoutCheck(string url)
        {
            var request = CreateRequest(url, HttpMethod.Get);
            return SendRequestWithoutCheck(request);
        }

        public TResult Post<TInput, TResult>(string url, TInput input)
		{
			var request = CreateRequest(url, HttpMethod.Post, input);
			return SendRequest<TResult>(request);
		}
        
        public HttpResponseMessage Post<TInput>(string url, TInput input)
		{
			var request = CreateRequest(url, HttpMethod.Post, input);
			return SendRequest(request);
		}

		public TResult Post<TResult>(string url)
		{
			var request = CreateRequest(url, HttpMethod.Post);
			return SendRequest<TResult>(request);
		}

		public HttpResponseMessage Post(string url)
		{
			var request = CreateRequest(url, HttpMethod.Post);
			return SendRequest(request);
		}

		public TResult Put<TInput, TResult>(string url, TInput input)
		{
			var request = CreateRequest(url, HttpMethod.Put, input);
			return SendRequest<TResult>(request);
		}

		public HttpResponseMessage Put<TInput>(string url, TInput input)
		{
			var request = CreateRequest(url, HttpMethod.Put, input);
			return SendRequest(request);
		}

		public HttpResponseMessage Delete(string url)
		{
			var request = CreateRequest(url, HttpMethod.Delete);
			return SendRequest(request);
		}

		protected virtual HttpResponseMessage CheckResponse(HttpResponseMessage response)
		{
			if (response.IsSuccessStatusCode)
			{
				return response;
			}

			var responseContent = response.Content.ReadAsStringAsync().Result;

            throw new Exception(responseContent);
		}
        
        #region Helper

        private HttpRequestMessage CreateRequest<TInput>(string url, HttpMethod method, TInput input)
		{
			return new HttpRequestMessage(method, url)
			{
				Content = input.ToJsonStringContent()
			};
		}

		protected HttpRequestMessage CreateRequest(string url, HttpMethod method)
		{
			return new HttpRequestMessage(method, url);
		}

		private HttpResponseMessage SendRequest(HttpRequestMessage request)
		{
            var requestMsg = Clone(request);
			using (var client = CreateClient())
			{
				var response = client.SendAsync(request).Result;
			    try
			    {
			        return CheckResponse(response);
                }
			    catch (Exception e)
			    {
                    if (e.Message.Contains("Authorization has been denied for this request") && AuthorizationResolver != null)
                    {
                        client.DefaultRequestHeaders.Authorization = AuthorizationResolver();
                        response = client.SendAsync(requestMsg).Result;
                        return CheckResponse(response);
                    }
                    throw;
			    }
			}
		}

	    private TResult SendRequest<TResult>(HttpRequestMessage request)
	    {
	        var requestMsg = Clone(request);
	        using (var client = CreateClient())
	        {
	            var response = client.SendAsync(request).Result;
	            try
	            {
	                return CheckResponse(response).Content.ReadAs<TResult>();
	            }
	            catch (Exception e)
	            {
                    if (e.Message.Contains("Authorization has been denied for this request") && AuthorizationResolver != null)
                    {
                        client.DefaultRequestHeaders.Authorization = AuthorizationResolver();
                        response = client.SendAsync(requestMsg).Result;
                        return CheckResponse(response).Content.ReadAs<TResult>();
                    }
                    throw;
	            }
	        }
	    }

	    private HttpRequestMessage Clone(HttpRequestMessage request)
	    {
	        var clone = new HttpRequestMessage(request.Method, request.RequestUri)
	        {
	            Content = Clone(request.Content),
	            Version = request.Version
	        };
	        foreach (KeyValuePair<string, object> prop in request.Properties)
	        {
	            clone.Properties.Add(prop);
	        }
	        foreach (KeyValuePair<string, IEnumerable<string>> header in request.Headers)
	        {
	            clone.Headers.TryAddWithoutValidation(header.Key, header.Value);
	        }

	        return clone;
	    }

	    private HttpContent Clone(HttpContent content)
	    {
	        if (content == null) return null;

	        var ms = new MemoryStream();
	        content.CopyToAsync(ms).Wait();
	        ms.Position = 0;

	        var clone = new StreamContent(ms);
	        foreach (KeyValuePair<string, IEnumerable<string>> header in content.Headers)
	        {
	            clone.Headers.Add(header.Key, header.Value);
	        }
	        return clone;
	    }

        private HttpResponseMessage SendRequestWithoutCheck(HttpRequestMessage request)
        {
            using (var client = CreateClient())
            {
                return client.SendAsync(request).Result;
            }
        }

        private HttpClient CreateClient()
        {
            var httpHandler = new HttpClientHandler
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };
			var client = new HttpClient(httpHandler);
            
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = Authorization;
            client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("deflate"));
            return client;
		}

		#endregion
	}

}
