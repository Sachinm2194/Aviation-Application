using Aviation_Application.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Aviation_Application
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });
            builder.Services.AddDbContext<AviationContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("dbcs")));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles(); // Add static files middleware

            app.UseRouting();

            app.UseCors("MyPolicy");
            app.UseAuthentication(); // Add authentication middleware
            app.UseAuthorization();

            app.UseExceptionHandler("/error"); // Add exception handling middleware

            app.MapControllers();

            app.Run();
        }
    }
}
