
using GestionSallesAPI.Enums;
using System.Text.Json.Serialization;

namespace GestionSallesAPI.Models; // Define the namespace

public class Salle
{
     public int Id { get; set; } // le ? pour que le id peut etre null on peut le laisser null a fin de l'auto incrementer par mongoDB
    public string Intitule { get; set; } = string.Empty; // Initialize Intitule to an empty string to avoid null reference issues
    public int Capacite { get; set; }
    public int Capacite_exam { get; set; }
    public CategorieSalle Categorie { get; set; }
    public int Surface { get; set; }
    public ICollection<Specification> Specifications {get; set;} = new List<Specification>();
    public string Etage { get; set; } = string.Empty;
    public int FaculteId {get; set;} 
    public bool Etat {get; set;} = true;
    public Faculte? Faculte {get; set;} 
    public int BatimentId {get; set;}
    public Batiment? Batiment {get; set;} 
}