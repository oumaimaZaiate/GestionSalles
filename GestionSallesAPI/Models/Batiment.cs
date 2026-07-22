namespace GestionSallesAPI.Models;
using System.Text.Json.Serialization;
public class Batiment
{  public int Id {get; set;}
    public string Intitule {get; set;} = string.Empty;
    public double Latitude { get ; set;}
    public double Longitude { get ; set;}
     public string Description { get; set; } = string.Empty;
    [JsonIgnore]
    public ICollection<Salle> Salles {get; set;} = new List<Salle>();
}