
using MongoDB.Bson;   // Import the MongoDB.Bson namespace for working with BSON binary json data types 
using MongoDB.Bson.Serialization.Attributes; // Import the MongoDB.Bson.Serialization.Attributes namespace for working with BSON serialization attributes 

namespace GestionSallesAPI.Models; // Define the namespace

public class Salle
{
    [BsonId] // Mark the Id property as PK
    [BsonRepresentation(BsonType.ObjectId)] // Id represented as an ObjectId in the database
    public string? Id { get; set; } // le ? pour que le id peut etre null on peut le laisser null a fin de l'auto incrementer par mongoDB
    public string Intitule { get; set; } = string.Empty; // Initialize Intitule to an empty string to avoid null reference issues
    public int Capacite { get; set; }
    public int Capacite_exam { get; set; }
    public string Categorie { get; set; }
    public int Surface { get; set; }
    public string Etage { get; set; } = string.Empty;
    [BsonRepresentation(BsonType.ObjectId)]
    public string? FaculteId {get; set;} 
    [BsonIgnore]
    public Faculte Faculte {get; set;} = new Faculte();
    [BsonRepresentation(BsonType.ObjectId)]
    public string? BatimentId {get; set;}
    [BsonIgnore]
    public Batiment? Batiment {get; set;} 
}