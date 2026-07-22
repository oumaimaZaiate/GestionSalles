
using System.Text.Json.Serialization;
namespace GestionSallesAPI.Models;

public class Faculte
{
    public int Id {get; set;}
    public string Intitule {get;set;} = string.Empty;
 [JsonIgnore]
    public ICollection<Salle> Salles {get; set;} = new List<Salle>();
}
