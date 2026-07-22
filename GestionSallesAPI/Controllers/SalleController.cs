using GestionSallesAPI.Models;
using GestionSallesAPI.Services;
using Microsoft.AspNetCore.Mvc;
using GestionSallesAPI.Enums; // for working with ASP.NET Core MVC features

namespace GestionSallesAPI.Controllers;

[ApiController] // Mark the class as an API controller
[Route("api/[controller]")]

public class SalleController : ControllerBase // Inherit from ControllerBase to gain access to controller features
{
private readonly SalleService _service; // Declare a private read-only field for the SalleService
private readonly SpecificationService _specificationService;
public SalleController(SalleService service, SpecificationService specificationService) // Constructor to inject the SalleService
{
    _service = service; // Assign the injected service to the private field
    _specificationService = specificationService;

}

[HttpGet]
public async Task<ActionResult<List<Salle>>> GetSalles() // Define an HTTP GET endpoint to retrieve all salles
    {
        return await _service.GetSalles();
    }

[HttpGet("{id}")] // Define an HTTP GET endpoint to retrieve a salle by its ID
public async Task<ActionResult<Salle?>> GetSalleById(int id)
    {
        return await _service.GetSalleById(id);
    }

[HttpPost]
public async Task<IActionResult> CreateSalle(Salle salle)
    {
        await _service.CreateSalle(salle);
        return CreatedAtAction(nameof(GetSalleById), new { id = salle.Id }, salle); // Return a 201 Created response with the location of the new resource
    }

[HttpPut("{id}")]
public async Task<IActionResult> UpdateSalle(int id,Salle salle)
    {  
        if(id != salle.Id)
        return BadRequest("L'identifiant ne correspond pas.");
        await _service.UpdateSalle(salle);
        return NoContent();
    }
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteSalle(int id)
    {
        await _service.DeleteSalle(id);
        return NoContent(); // Return a 204 No Content response to indicate successful deletion
    }
[HttpGet("specifications")]
public async Task<ActionResult<List<Specification>>> GetSpecifications()
{
    return await _specificationService.GetSpecifications();
}

[HttpGet("Categories")]
public IActionResult GetCategorieSalle()
    {
        return Ok(Enum.GetNames<CategorieSalle>());
    }


[HttpPatch("{id}/etat")]
public async Task<IActionResult> ChangerEtat(int id)
{
    var result = await _service.ChangerEtat(id);

    if (!result)
        return NotFound();

    return NoContent();
}

}