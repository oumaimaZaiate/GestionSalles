using Microsoft.AspNetCore.Mvc;
using GestionSallesAPI.Models;
using GestionSallesAPI.Services;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authorization;

namespace GestionSallesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FaculteController : ControllerBase
{
private readonly FaculteService _service;    

public FaculteController(FaculteService service)
    {
        _service = service ;
    }

[HttpGet]
public async Task<ActionResult<List<Faculte>>> GetFacultes()
    {
        return await _service.GetFacultes();
    }
    
[HttpGet("{id}")]
public async Task<ActionResult<Faculte>> GetFaculteById(int id)
    {
        return await _service.GetFaculteById(id);
    }

[HttpPost]

public async Task<IActionResult> CreateFaculte(Faculte faculte)
    {
        await _service.CreateFaculte(faculte);
        return CreatedAtAction(nameof(GetFaculteById),new {id = faculte.Id} , faculte );
    }
[HttpPut("{id}")]
public async Task<IActionResult> UpdateFaculte(int id,Faculte faculte)
    {
         if(id != faculte.Id)
        return BadRequest("L'identifiant ne correspond pas.");
        await _service.UpdateFaculte(faculte);
        return NoContent();
    }
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteFaculte(int id)
    {
        await _service.DeleteFaculte(id);
        return NoContent();
    }
};