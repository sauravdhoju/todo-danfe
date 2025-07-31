using Microsoft.EntityFrameworkCore;
using TodoFullStackApp.Models;

namespace TodoFullStackApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}