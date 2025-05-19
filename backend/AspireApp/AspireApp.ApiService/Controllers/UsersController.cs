using Microsoft.AspNetCore.Mvc;
using AspireApp.ApiService.Models;
using AspireApp.ApiService.Data;

namespace AspireApp.ApiService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<User>> GetUsers()
    {
        return Ok(MockDataService.Users);
    }

    [HttpGet("{id}")]
    public ActionResult<User> GetUser(int id)
    {
        var user = MockDataService.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
            return NotFound();

        return Ok(user);
    }

    [HttpPost]
    public ActionResult<User> CreateUser(User user)
    {
        user.Id = MockDataService.Users.Max(u => u.Id) + 1;
        user.CreatedAt = DateTime.UtcNow;
        MockDataService.Users.Add(user);
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, User user)
    {
        var existingUser = MockDataService.Users.FirstOrDefault(u => u.Id == id);
        if (existingUser == null)
            return NotFound();

        existingUser.Email = user.Email;
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Role = user.Role;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = MockDataService.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
            return NotFound();

        MockDataService.Users.Remove(user);
        return NoContent();
    }

    [HttpGet("{id}/orders")]
    public ActionResult<IEnumerable<Order>> GetUserOrders(int id)
    {
        var orders = MockDataService.Orders.Where(o => o.UserId == id).ToList();
        return Ok(orders);
    }
} 