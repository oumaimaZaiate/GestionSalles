using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GestionSallesAPI.Models;

public class Batiment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id {get; set;}
    public string Intitule {get; set;} = string.Empty;
   // public ICollection<Salle> Salles {get; set;} = new List<Salle>();
    public double Latitude { get ; set;}
    public double Longitude { get ; set;}
}