using GestionSallesAPI.Models;
using System.Text.Json.Serialization;
namespace GestionSallesAPI;

public class Specification
{
    public int Id {get;set;}
    public string Nom {get;set;} = string.Empty;
    [JsonIgnore]
   public ICollection<Salle> Salles {get;set;} = new List<Salle>();
}