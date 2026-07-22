using GestionSallesAPI.DBSettings;
using GestionSallesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionSallesAPI.Services;

public class SpecificationService
{
    private readonly AppDbContext _context;

    public SpecificationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Specification>> GetSpecifications()
    {
        return await _context.Specifications
            .OrderBy(s => s.Nom)
            .ToListAsync();
    }

    public async Task<Specification?> GetSpecificationById(int id)
    {
        return await _context.Specifications
            .FirstOrDefaultAsync(s => s.Id == id);
    }
}