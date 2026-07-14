using MongoDB.Driver;
using GestionSallesAPI.Models;
using GestionSallesAPI.Settings;
using Microsoft.Extensions.Options;

namespace GestionSallesAPI.Services;
public class BatimentService
{
    private readonly IMongoCollection<Batiment> _batiments;
    public BatimentService(IMongoDatabase database, IOptions<MongoDbSettings> settings)
    {
        _batiments = database.GetCollection<Batiment>(settings.Value.BatimentCollectionName);
    }

    public async Task<List<Batiment>> GetBatiments()
    {
        return await _batiments.Find(_ => true).ToListAsync();
    }

    public async Task<Batiment?> GetBatimentById(string id)
    {
        return await _batiments.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
    public async Task CreateBatiment (Batiment batiment)
    {
        await _batiments.InsertOneAsync(batiment);
    }

    public async Task UpdateBatiment(string id,Batiment batiment)
    {
     batiment.Id = id;
     await _batiments.ReplaceOneAsync(x => x.Id == id,batiment);  
    }

    public async Task DeleteBatiment(string id)
    {
        await _batiments.DeleteOneAsync(x => x.Id == id);
    }
}