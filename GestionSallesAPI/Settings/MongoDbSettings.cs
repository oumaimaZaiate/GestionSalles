namespace GestionSallesAPI.Settings;
// pour stocker les informations de connexion a la base de donnees MongoDB
public class MongoDbSettings
{
   public string ConnectionString { get; set; } = null!; //null! permet de dire que la valeur ne peut pas etre null
   public string DatabaseName { get; set; } = null!;
   public string SalleCollectionName  { get; set; } = null!;
   public string FaculteCollectionName {get;set;} = null!;
   public string BatimentCollectionName {get;set;} =null!;
   public string UserCollectionName {get;set;} =null!;


   
}