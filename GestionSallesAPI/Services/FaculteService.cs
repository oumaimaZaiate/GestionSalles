using GestionSallesAPI.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using GestionSallesAPI.Models;

namespace GestionSallesAPI.Services;

public class FaculteService 
{
    private readonly IMongoCollection<Faculte> _facultes;

    public FaculteService(IMongoDatabase database, IOptions<MongoDbSettings> settings)
    {
        _facultes = database.GetCollection<Faculte>(settings.Value.FaculteCollectionName);
    }

    public async Task<List<Faculte>> GetFacultes()
    {
        return await _facultes.Find(_ => true).ToListAsync();
    }

    public async Task<Faculte> GetFaculteById(string id)
    {
        return await _facultes.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
    public async Task CreateFaculte(Faculte faculte)
    {
        await _facultes.InsertOneAsync(faculte);
    }

    public async Task UpdateFaculte(string id,Faculte faculte)
    {
        faculte.Id = id;
        await _facultes.ReplaceOneAsync(x => x.Id == id,faculte);
    }

    public async Task DeleteFaculte(string id)
    {
        await _facultes.DeleteOneAsync(x => x.Id == id);
    }

};