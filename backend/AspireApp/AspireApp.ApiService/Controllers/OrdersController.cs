using Microsoft.AspNetCore.Mvc;
using AspireApp.ApiService.Models;
using AspireApp.ApiService.Data;

namespace AspireApp.ApiService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Order>> GetOrders()
    {
        return Ok(MockDataService.Orders);
    }

    [HttpGet("{id}")]
    public ActionResult<Order> GetOrder(int id)
    {
        var order = MockDataService.Orders.FirstOrDefault(o => o.Id == id);
        if (order == null)
            return NotFound();

        return Ok(order);
    }

    [HttpPost]
    public ActionResult<Order> CreateOrder(Order order)
    {
        order.Id = MockDataService.Orders.Max(o => o.Id) + 1;
        order.CreatedAt = DateTime.UtcNow;
        order.Status = "Pending";
        MockDataService.Orders.Add(order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateOrder(int id, Order order)
    {
        var existingOrder = MockDataService.Orders.FirstOrDefault(o => o.Id == id);
        if (existingOrder == null)
            return NotFound();

        existingOrder.Status = order.Status;
        existingOrder.ShippingAddress = order.ShippingAddress;
        existingOrder.TrackingNumber = order.TrackingNumber;
        existingOrder.UpdatedAt = DateTime.UtcNow;

        // Update status-specific timestamps
        if (order.Status == "Shipped" && existingOrder.Status != "Shipped")
            existingOrder.ShippedAt = DateTime.UtcNow;
        else if (order.Status == "Delivered" && existingOrder.Status != "Delivered")
            existingOrder.DeliveredAt = DateTime.UtcNow;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteOrder(int id)
    {
        var order = MockDataService.Orders.FirstOrDefault(o => o.Id == id);
        if (order == null)
            return NotFound();

        MockDataService.Orders.Remove(order);
        return NoContent();
    }

    [HttpGet("stats")]
    public ActionResult<object> GetOrderStats()
    {
        var stats = new
        {
            TotalOrders = MockDataService.Orders.Count,
            TotalRevenue = MockDataService.Orders.Sum(o => o.TotalAmount),
            OrdersByStatus = MockDataService.Orders
                .GroupBy(o => o.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() }),
            RecentOrders = MockDataService.Orders
                .OrderByDescending(o => o.CreatedAt)
                .Take(5)
                .Select(o => new
                {
                    o.Id,
                    o.Status,
                    o.TotalAmount,
                    o.CreatedAt,
                    UserName = MockDataService.Users
                        .FirstOrDefault(u => u.Id == o.UserId)?
                        .FirstName + " " + MockDataService.Users
                        .FirstOrDefault(u => u.Id == o.UserId)?
                        .LastName
                })
        };

        return Ok(stats);
    }
} 