using AspireApp.ApiService.Models;

namespace AspireApp.ApiService.Data;

public class MockDataService
{
    private static readonly List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop Pro", Description = "High-performance laptop", Price = 1299.99m, StockLevel = 50, ReorderThreshold = 10, CreatedAt = DateTime.UtcNow.AddDays(-30) },
        new Product { Id = 2, Name = "Smartphone X", Description = "Latest smartphone model", Price = 899.99m, StockLevel = 100, ReorderThreshold = 20, CreatedAt = DateTime.UtcNow.AddDays(-25) },
        new Product { Id = 3, Name = "Wireless Earbuds", Description = "Noise-cancelling earbuds", Price = 199.99m, StockLevel = 200, ReorderThreshold = 30, CreatedAt = DateTime.UtcNow.AddDays(-20) },
        new Product { Id = 4, Name = "Smart Watch", Description = "Fitness and health tracker", Price = 299.99m, StockLevel = 75, ReorderThreshold = 15, CreatedAt = DateTime.UtcNow.AddDays(-15) },
        new Product { Id = 5, Name = "Tablet Ultra", Description = "Professional tablet", Price = 799.99m, StockLevel = 40, ReorderThreshold = 10, CreatedAt = DateTime.UtcNow.AddDays(-10) }
    };

    private static readonly List<User> _users = new()
    {
        new User { Id = 1, Email = "john.doe@example.com", FirstName = "John", LastName = "Doe", Role = "User", CreatedAt = DateTime.UtcNow.AddMonths(-2) },
        new User { Id = 2, Email = "jane.smith@example.com", FirstName = "Jane", LastName = "Smith", Role = "Admin", CreatedAt = DateTime.UtcNow.AddMonths(-3) },
        new User { Id = 3, Email = "bob.wilson@example.com", FirstName = "Bob", LastName = "Wilson", Role = "User", CreatedAt = DateTime.UtcNow.AddMonths(-1) }
    };

    private static readonly List<Order> _orders = new()
    {
        new Order 
        { 
            Id = 1, 
            UserId = 1, 
            Status = "Delivered", 
            TotalAmount = 1499.98m,
            CreatedAt = DateTime.UtcNow.AddDays(-45),
            ShippedAt = DateTime.UtcNow.AddDays(-40),
            DeliveredAt = DateTime.UtcNow.AddDays(-38),
            ShippingAddress = "123 Main St, City, Country",
            TrackingNumber = "TRK123456"
        },
        new Order 
        { 
            Id = 2, 
            UserId = 2, 
            Status = "Shipped", 
            TotalAmount = 299.99m,
            CreatedAt = DateTime.UtcNow.AddDays(-20),
            ShippedAt = DateTime.UtcNow.AddDays(-18),
            ShippingAddress = "456 Oak Ave, Town, Country",
            TrackingNumber = "TRK789012"
        },
        new Order 
        { 
            Id = 3, 
            UserId = 3, 
            Status = "Processing", 
            TotalAmount = 799.99m,
            CreatedAt = DateTime.UtcNow.AddDays(-5),
            ShippingAddress = "789 Pine Rd, Village, Country"
        }
    };

    private static readonly List<OrderItem> _orderItems = new()
    {
        new OrderItem { Id = 1, OrderId = 1, ProductId = 1, Quantity = 1, UnitPrice = 1299.99m, TotalPrice = 1299.99m },
        new OrderItem { Id = 2, OrderId = 1, ProductId = 3, Quantity = 1, UnitPrice = 199.99m, TotalPrice = 199.99m },
        new OrderItem { Id = 3, OrderId = 2, ProductId = 4, Quantity = 1, UnitPrice = 299.99m, TotalPrice = 299.99m },
        new OrderItem { Id = 4, OrderId = 3, ProductId = 5, Quantity = 1, UnitPrice = 799.99m, TotalPrice = 799.99m }
    };

    public static List<Product> Products => _products;
    public static List<User> Users => _users;
    public static List<Order> Orders => _orders;
    public static List<OrderItem> OrderItems => _orderItems;
} 