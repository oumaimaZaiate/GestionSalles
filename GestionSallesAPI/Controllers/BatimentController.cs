using GestionSallesAPI.Models;
using GestionSallesAPI.Services;
using Microsoft.AspNetCore.Mvc;


namespace GestionSallesAPI.Controllers;





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
    public async Task<ActionResult<Batiment?>> GetBatimentById(int id)
    {
        return await _service.GetBatimentById(id);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBatiment(Batiment batiment)
    {
        await _service.CreateBatiment(batiment);
        return CreatedAtAction(nameof(GetBatimentById),new {id = batiment.Id} , batiment );

    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBatiment(int id, Batiment batiment)
    {
                if(id != batiment.Id)
        return BadRequest("L'identifiant ne correspond pas.");
        await _service.UpdateBatiment(batiment);
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBatiment(int id)
    {
        await _service.DeleteBatiment(id);
        return NoContent();
    }




}