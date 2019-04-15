using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.OData.Edm;
using System.IO;
using TuringApp.Filters;
using TuringApp.Models;

namespace TuringApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(

                options =>
                {
                    options.Filters.Add(new ActionFilter()); // an instance
                }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddJsonOptions(options => { options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; });
            services.AddDbContext<turingContext>(opt => opt.UseMySQL("server=localhost;port=3306;user=root;password=1234;database=turing"));


            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddOData();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", "product_images")),
                RequestPath = "/MyImages"
            });
                
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "image",
                    template: "Images/product_images/");

                routes.MapODataServiceRoute("odata", "odata", GetEdmModel());

                routes.Select().Expand().Filter().OrderBy().MaxTop(500).Count();
            });



            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


        }

        private static IEdmModel GetEdmModel()
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();

           

            builder.EntitySet<Product>("Products");
            //builder.EntitySet<ProductCategory>("ProductCategories");
            builder.EntitySet<Department>("Departments");
            builder.EntitySet<Category>("Categories");
            builder.EntitySet<ShoppingCart>("ShoppingCart");
            builder.EntitySet<AttributeValue>("AttributeValue");


            var filteredProduct = builder.Action("GetProductByFilter");
            filteredProduct.Namespace = "TuringService";
            filteredProduct.Parameter<int?>("selectedDepartment");
            filteredProduct.Parameter<int?>("selectedCategoryId");
            filteredProduct.Returns<IActionResult>();

            return builder.GetEdmModel();
        }
    }
}
