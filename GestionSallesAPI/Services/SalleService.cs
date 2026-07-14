using GestionSallesAPI.Settings;
using GestionSallesAPI.Models;
using Microsoft.Extensions.Options; // Permet de récupérer les paramètres du fichier appsettings.json.
using MongoDB.Driver; // Permet de se connecter à la base de données MongoDB

namespace GestionSallesAPI.Services;

public class SalleService
{
    private readonly IMongoCollection<Salle> _salles;
    private readonly IMongoCollection<Batiment> _batiments;
    private readonly IMongoCollection<Faculte> _facultes;

//constructeur
  public SalleService(IMongoDatabase database, IOptions<MongoDbSettings> settings) // sert à récupérer les paramètres de configuration
    {
        _salles = database.GetCollection<Salle>(settings.Value.SalleCollectionName); // récupère la collection de salles à partir de la base de données MongoDB
        _facultes = database.GetCollection<Faculte>(settings.Value.FaculteCollectionName);
        _batiments = database.GetCollection<Batiment>(settings.Value.BatimentCollectionName);
    }

public async Task<List<Salle>> GetSalles  ()  //return une list de salles
    {
        var salles = await _salles.Find(_ => true).ToListAsync();
           foreach(var salle in salles ) {
            if (!string.IsNullOrEmpty(salle.FaculteId))
            {
                salle.Faculte = await _facultes
                .Find(f => f.Id == salle.FaculteId)
                .FirstOrDefaultAsync();
            }
            if (!string.IsNullOrEmpty(salle.BatimentId))
            {
                salle.Batiment = await _batiments
                .Find(b => b.Id == salle.BatimentId)
                .FirstOrDefaultAsync();
            };
            };

    return salles;
    }



public async Task<Salle?> GetSalleById(string id)
    {
        var salle = await _salles.Find(x => x.Id == id).FirstOrDefaultAsync();
         if (!string.IsNullOrEmpty(salle.FaculteId))
            {
                salle.Faculte = await _facultes
                .Find(f => f.Id == salle.FaculteId)
                .FirstOrDefaultAsync();
            }
            if (!string.IsNullOrEmpty(salle.BatimentId))
            {
                salle.Batiment = await _batiments
                .Find(b => b.Id == salle.BatimentId)
                .FirstOrDefaultAsync();
            };
            return salle;
    }
    
public async Task CreateSalle(Salle salle)
    {
        await _salles.InsertOneAsync(salle);
    }

public async Task UpdateSalle(string id , Salle salle)
    {
        salle.Id = id;
        await _salles.ReplaceOneAsync(x => x.Id == id,salle);
    }

public async Task DeleteSalle(string id)
    {
        await _salles.DeleteOneAsync(x => x.Id == id);
    }

};