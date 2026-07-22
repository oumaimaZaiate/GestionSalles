using Microsoft.EntityFrameworkCore;
using GestionSallesAPI.Models;
using GestionSallesAPI.DBSettings;

namespace GestionSallesAPI.Services;

public class FaculteService 
{
    private readonly AppDbContext _context;

    public FaculteService(AppDbContext context)
    {
    _context = context;
    }

    public async Task<List<Faculte>> GetFacultes()
    {
        return await _context.Facultes
        .Include(f => f.Salles)
        .ToListAsync();
    }

    public async Task<Faculte?> GetFaculteById(int id)
    {
        return await _context.Facultes
        .Include(f => f.Salles)
        .FirstOrDefaultAsync(f => f.Id == id);
    }
    public async Task CreateFaculte(Faculte faculte)
    {
         _context.Facultes.Add(faculte);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateFaculte(Faculte faculte)
    {
         _context.Facultes.Update(faculte);
        await _context.SaveChangesAsync();
           }

    public async Task DeleteFaculte(int id)
    {
        var faculte = await _context.Facultes.FindAsync(id);
        if(faculte != null){
        _context.Facultes.Remove(faculte);
        await _context.SaveChangesAsync(); 
        }   }

};