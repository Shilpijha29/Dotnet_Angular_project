using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DataController : ControllerBase
{
    private readonly DataService _dataService = new DataService();

    [HttpGet]
    public IActionResult Get()
    {
        var data = _dataService.GetData();
        return Ok(data);
    }

    [HttpPost]
    public IActionResult Save([FromBody] Observation observation)
    {
        _dataService.SaveData(observation);
        return Ok(new { message = "Data saved successfully!" });
    }
}
