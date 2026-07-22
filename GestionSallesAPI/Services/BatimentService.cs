using GestionSallesAPI.Models;
using GestionSallesAPI.DBSettings;
using Microsoft.EntityFrameworkCore;

namespace GestionSallesAPI.Services;
public class BatimentService
{
    private readonly AppDbContext _context;
    public BatimentService(AppDbContext context)
    {
    _context = context ;
    }

    public async Task<List<Batiment>> GetBatiments()
    {
        return await _context.Batiments
        .Include(b => b.Salles)
        .ToListAsync();
    }

    public async Task<Batiment?> GetBatimentById(int id)
    {
         return await _context.Batiments
        .Include(b => b.Salles)
        .FirstOrDefaultAsync(b => b.Id == id);
    }
    public async Task CreateBatiment (Batiment batiment)
    {
        _context.Batiments.Add(batiment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateBatiment(Batiment batiment)
    {
     _context.Batiments.Update(batiment);
        await _context.SaveChangesAsync();  
     }

    public async Task DeleteBatiment(int id)
    {
        var batiment = await _context.Batiments.FindAsync(id);
        if(batiment != null)
        {
             _context.Batiments.Remove(batiment);
        await _context.SaveChangesAsync();
        }
    }
}