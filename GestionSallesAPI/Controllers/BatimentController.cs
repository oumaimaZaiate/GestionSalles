using GestionSallesAPI.Models;
using GestionSallesAPI.Services;    

namespace GestionSallesAPI.Controllers;


using GestionSallesAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class BatimentController : ControllerBase
{
    private readonly BatimentService _service;

    public BatimentController(BatimentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<Batiment>>> GetBatiments()
    {
       return await _service.GetBatiments(); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Batiment?>> GetBatimentById(string id)
    {
        return await _service.GetBatimentById(id);
    }
    [HttpPost]

    public async Task<IActionResult> CreateBatiment(Batiment batiment)
    {
        await _service.CreateBatiment(batiment);
        return CreatedAtAction(nameof(GetBatimentById),new {id = batiment.Id },batiment);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBatiment(string id, Batiment batiment)
    {
        await _service.UpdateBatiment(id,batiment);
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBatiment(string id)
    {
        await _service.DeleteBatiment(id);
        return NoContent();
    }




}