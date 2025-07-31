using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoFullStackApp.Data;
using TodoFullStackApp.Models;

namespace TodoFullStackApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly AppDbContext _db;

    public TodoController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Todos.ToListAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetById(int id)
    {
        var todo = await _db.Todos.FindAsync(id);

        if (todo == null)
        {
            return NotFound();
        }

        return Ok(todo);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create(Todo todo)
    {
        if (todo.DueDate < DateTime.Now)
            return BadRequest("Due date cannot be in the past.");

        _db.Todos.Add(todo);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Todo updated)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo == null) return NotFound();

        todo.Title = updated.Title;
        todo.DueDate = updated.DueDate;
        todo.IsCompleted = updated.IsCompleted;
        await _db.SaveChangesAsync();

        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await _db.Todos.FindAsync(id);
        if (todo == null) return NotFound();

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}