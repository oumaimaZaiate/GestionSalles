using GestionSallesAPI.Services;
using GestionSallesAPI.Models;
using Microsoft.EntityFrameworkCore;
using GestionSallesAPI.DBSettings;
using System.Text.Json.Serialization;
var builder = WebApplication.CreateBuilder(args); // le role est de créer un objet builder qui va nous permettre de configurer notre application

//BD
builder.Services.AddDbContext<AppDbContext>(
options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

//services 
builder.Services.AddScoped<SalleService>();
builder.Services.AddScoped<BatimentService>();
builder.Services.AddScoped<FaculteService>();
builder.Services.AddScoped<SpecificationService>();

builder.Services.AddControllers()
     .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer(); // pour explorer les endpoints de l'API
builder.Services.AddSwaggerGen(); // pour générer la documentation de l'API avec Swagger
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});



var app = builder.Build();
app.UseCors("Angular");
app.UseSwagger(); // pour activer Swagger dans l'application
app.UseSwaggerUI(); // pour activer l'interface utilisateur de Swagger  
app.MapControllers(); // pour mapper les contrôleurs de l'application
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();




app.Run();
