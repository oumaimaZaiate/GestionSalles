using GestionSallesAPI.Settings;
using GestionSallesAPI.Services;
using MongoDB.Driver; 
using Microsoft.Extensions.Options; // Permet de récupérer les paramètres du fichier appsettings.json.
using GestionSallesAPI.Models;
using System.Text.Json.Serialization;
var builder = WebApplication.CreateBuilder(args); // le role est de créer un objet builder qui va nous permettre de configurer notre application

// Add services to the container.

builder.Services.Configure<MongoDbSettings>(
builder.Configuration.GetSection("MongoDbSettings")); // configure les paramètres de connexion à MongoDB à partir du fichier appsettings.json
//services 
builder.Services.AddSingleton<SalleService>();
builder.Services.AddSingleton<BatimentService>();
builder.Services.AddSingleton<FaculteService>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });builder.Services.AddEndpointsApiExplorer(); // pour explorer les endpoints de l'API
builder.Services.AddSwaggerGen(); // pour générer la documentation de l'API avec Swagger
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;

    var client = new MongoClient(settings.ConnectionString);

    return client.GetDatabase(settings.DatabaseName);
});builder.Services.AddCors(options =>
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
