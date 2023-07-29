using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.ExceptionsBreakpoint
{
    public class BreakpointExp
    {
        //for completion of request processing
        private  RequestDelegate _next;
        private  ILogger<BreakpointExp> _logger;

        //for fetching hosting environment info
        private  IHostEnvironment _env;

        public BreakpointExp(RequestDelegate next, ILogger<BreakpointExp> logger, 
            IHostEnvironment env)
        {
            _env = env;

            _logger = logger;

            _next = next;
        }

        public async Task InvokeAsync(HttpContext cont)
        {
            try
            {
                await _next(cont);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                cont.Response.ContentType = "application/json";

                cont.Response.StatusCode = 500;

                var response = new ProblemDetails
                {
                    Status = 500,

                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,

                    Title = ex.Message
                };

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await cont.Response.WriteAsync(json);
            }
        }
    }
}