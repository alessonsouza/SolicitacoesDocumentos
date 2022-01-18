using System;
using System.IO;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using solicitacoesDocumentos.Helper.Connection;
using solicitacoesDocumentos.Interfaces;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Interfaces.Services.Security;
using solicitacoesDocumentos.Mapper;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;
using solicitacoesDocumentos.Repository;
using solicitacoesDocumentos.Services;

namespace solicitacoesDocumentos
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



            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });


            services.AddScoped<IAuthenticationRepository, AuthenticateRepository>();
            var logger = new LoggerConfiguration()
               .MinimumLevel.Verbose()
               .WriteTo.Console()
               .WriteTo.File("logs" + Path.DirectorySeparatorChar + "app.log", rollingInterval: RollingInterval.Month)
               .CreateLogger();


            services.AddSingleton<ILogger>(logger);

            // services.AddTransient<MySqlConnection>(_ => new MySqlConnection(Configuration["ConnectionStrings:Default"]));
            services.AddSingleton<IConnectionFactory, ConnectionFactory>();

            var mapperConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new AutoMapperProfile());
                });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.AddHttpContextAccessor();
            //Users
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICrudService<EUser>, UserService>();

            //SO
            services.AddScoped<ISolicitacoesRepository, SolicitacoesRepository>();
            services.AddScoped<ISolicitacoesService, SolicitacoesService>();
            services.AddScoped<ICrudService<ESolicitacao>, SolicitacoesService>();

            //TipoSolicitante
            services.AddScoped<ITipoSolicitanteRepository, TipoSolicitanteRepository>();
            services.AddScoped<ITipoSolicitanteService, TipoSolicitanteService>();
            services.AddScoped<ICrudService<ETipoRequerente>, TipoSolicitanteService>();

            //TipoDocumento
            services.AddScoped<ITipoDocumentoRepository, TipoDocumentoRepository>();
            services.AddScoped<ITipoDocumentoService, TipoDocumentoService>();
            services.AddScoped<ICrudService<ETipoDocumento>, TipoDocumentoService>();

            //StatusSolicitação
            services.AddScoped<IStatusSolicitacaoRepository, StatusSolicitacaoRepository>();
            services.AddScoped<IStatusSolicitacaoService, StatusSolicitacaoService>();
            services.AddScoped<ICrudService<EStatusSolicitacao>, StatusSolicitacaoService>();

            //MotivosSolicitação
            services.AddScoped<IMotivoSolicitacaoRepository, MotivoSolicitacaoRepository>();
            services.AddScoped<IMotivoSolicitacaoService, MotivoSolicitacaoService>();
            services.AddScoped<ICrudService<EMotivoSolicitacao>, MotivoSolicitacaoService>();

            //TipoRetirada
            services.AddScoped<ITipoRetiradaRepository, TipoRetiradaRepository>();
            services.AddScoped<ITipoRetiradaService, TipoRetiradaService>();
            services.AddScoped<ICrudService<ETipoRetirada>, TipoRetiradaService>();

            //Documentos
            services.AddScoped<IDocumentosRepository, DocumentosRepository>();
            services.AddScoped<IDocumentosService, DocumentosService>();
            services.AddScoped<ICrudService<EDocumentos>, DocumentosService>();

            services.AddScoped<IMailService, MailService>();

            services.AddSingleton<ITokenService, TokenService>();

            services.AddScoped<DbContext, DbContext>();
            services.AddDbContext<ContextDB>(options =>
            {
                options.UseMySQL(Configuration.GetSection("ConnectionStrings:Default").Value);
            });
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );



            services.AddCors();

            // services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "solicitacoesDocumentos", Version = "v1" });
            // });           

            var key = Encoding.ASCII.GetBytes((Configuration["Jwt:Key"]));
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddJwtBearer(x =>
              {
                  x.RequireHttpsMetadata = false;
                  x.SaveToken = true;
                  x.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(key),
                      ValidateIssuer = false,
                      ValidateAudience = false
                  };
              });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors(x => x
               .AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(x => _ = true)
           );


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseSwagger();
                // app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "solicitacoesDocumentos v1"));
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(env.ContentRootPath, "wwwroot")),
                RequestPath = "/Docs"
            });
            app.UseSpaStaticFiles();


            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
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
    }
}
