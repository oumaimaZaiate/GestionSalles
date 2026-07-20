using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GestionSallesAPI.Models;

public class Batiment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id {get; set;}
    public string Intitule {get; set;} = string.Empty;
    public double Latitude { get ; set;}
    public double Longitude { get ; set;}
     public string Description { get; set; } = string.Empty;

}