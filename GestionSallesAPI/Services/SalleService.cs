using GestionSallesAPI.Models;
using GestionSallesAPI.DBSettings;
using Microsoft.EntityFrameworkCore;

namespace GestionSallesAPI.Services;

public class SalleService
{
    

//constructeur
private readonly AppDbContext _context;

public SalleService(AppDbContext context)
{
    _context = context;
}
 

public async Task<List<Salle>> GetSalles  ()  //return une list de salles
    {
       return await _context.Salles
     .Include(s => s.Batiment)
       .Include(s => s.Faculte)
       .Include(s => s.Specifications)
       .ToListAsync();
    }



public async Task<Salle?> GetSalleById(int id)
    {
          return await _context.Salles
       .Include(s => s.Batiment)
       .Include(s => s.Faculte)
       .Include(s => s.Specifications)
       .FirstOrDefaultAsync(s => s.Id == id);
    }
    
public async Task CreateSalle(Salle salle)
    {
         var ids = salle.Specifications
                   .Select(s => s.Id)
                   .ToList();

    salle.Specifications = await _context.Specifications
        .Where(s => ids.Contains(s.Id))
        .ToListAsync();
         _context.Salles.Add(salle);
         await _context.SaveChangesAsync();
    }
public async Task<bool> ChangerEtat(int id)
{
    var salle = await _context.Salles.FindAsync(id);

    if (salle == null)
        return false;

    salle.Etat = !salle.Etat;

    await _context.SaveChangesAsync();

    return true;
}

public async Task UpdateSalle(Salle salle)
{
    var existing = await _context.Salles
        .Include(s => s.Specifications)
        .FirstOrDefaultAsync(s => s.Id == salle.Id);

    if (existing == null)
        return;

    existing.Intitule = salle.Intitule;
    existing.Capacite = salle.Capacite;
    existing.Capacite_exam = salle.Capacite_exam;
    existing.Categorie = salle.Categorie;
    existing.Surface = salle.Surface;
    existing.Etage = salle.Etage;
    existing.Etat = salle.Etat;
    existing.FaculteId = salle.FaculteId;
    existing.BatimentId = salle.BatimentId;

    var ids = salle.Specifications.Select(s => s.Id).ToList();

    existing.Specifications = await _context.Specifications
        .Where(s => ids.Contains(s.Id))
        .ToListAsync();

    await _context.SaveChangesAsync();
}
public async Task DeleteSalle(int id)
    {
 var salle = await _context.Salles.FindAsync(id);

    if (salle != null)
    {
        _context.Salles.Remove(salle);

        await _context.SaveChangesAsync();
    }   
     }
     

};