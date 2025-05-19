using System;
using System.Collections.Generic;
using System.Linq;
using AspireApp.ApiService.Models;

namespace AspireApp.ApiService.Data;

public static class MockData
{
    private static readonly Random Random = new Random();

    public static List<Product> GenerateProducts(int count = 100)
    {
        var categories = new[] { "Electronics", "Clothing", "Home & Garden", "Books", "Sports", "Toys", "Beauty", "Food" };
        var brands = new[] { "TechPro", "FashionCo", "HomeStyle", "BookWorld", "SportLife", "ToyLand", "BeautyPlus", "FoodFresh" };
        
        return Enumerable.Range(1, count).Select(i => new Product
        {
            Id = i,
            Name = $"{brands[Random.Next(brands.Length)]} {categories[Random.Next(categories.Length)]} {i}",
            Description = $"High-quality {categories[Random.Next(categories.Length)].ToLower()} product with premium features.",
            Price = Math.Round((decimal)(Random.NextDouble() * 1000 + 10), 2),
            StockLevel = Random.Next(0, 1000),
            ReorderThreshold = Random.Next(10, 50),
            CreatedAt = DateTime.UtcNow.AddDays(-Random.Next(1, 365)),
            UpdatedAt = DateTime.UtcNow.AddDays(-Random.Next(0, 30))
        }).ToList();
    }

    public static List<User> GenerateUsers(int count = 30)
    {
        var firstNames = new[] { "John", "Jane", "Michael", "Emily", "David", "Sarah", "James", "Emma", "Robert", "Lisa" };
        var lastNames = new[] { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez" };
        var roles = new[] { "Admin", "Manager", "Customer", "Support" };
        
        return Enumerable.Range(1, count).Select(i => new User
        {
            Id = i,
            FirstName = firstNames[Random.Next(firstNames.Length)],
            LastName = lastNames[Random.Next(lastNames.Length)],
            Email = $"user{i}@example.com",
            Role = roles[Random.Next(roles.Length)],
            CreatedAt = DateTime.UtcNow.AddDays(-Random.Next(1, 365)),
            LastLogin = DateTime.UtcNow.AddDays(-Random.Next(0, 30))
        }).ToList();
    }

    public static List<Order> GenerateOrders(int count = 500)
    {
        var statuses = new[] { "Pending", "Processing", "Shipped", "Delivered", "Cancelled" };
        var products = GenerateProducts();
        var users = GenerateUsers();
        
        return Enumerable.Range(1, count).Select(i => new Order
        {
            Id = i,
            UserId = users[Random.Next(users.Count)].Id,
            Status = statuses[Random.Next(statuses.Length)],
            CreatedAt = DateTime.UtcNow.AddDays(-Random.Next(1, 365)),
            UpdatedAt = DateTime.UtcNow.AddDays(-Random.Next(0, 30)),
            Items = GenerateOrderItems(i, products)
        }).ToList();
    }

    private static List<OrderItem> GenerateOrderItems(int orderId, List<Product> products)
    {
        var itemCount = Random.Next(1, 6); // 1-5 items per order
        return Enumerable.Range(1, itemCount).Select(i => new OrderItem
        {
            Id = (orderId * 100) + i,
            OrderId = orderId,
            ProductId = products[Random.Next(products.Count)].Id,
            Quantity = Random.Next(1, 5),
            UnitPrice = Math.Round((decimal)(Random.NextDouble() * 1000 + 10), 2)
        }).ToList();
    }
} 