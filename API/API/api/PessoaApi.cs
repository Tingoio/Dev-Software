using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;

public static class PessoaApi{
    public static async void MapPessoaApi (this WebApplication app) {

        var group = app.MapGroup("/");

        //GET
        group.MapGet("/pessoas", async (AppDatabase db) =>
            await db.Pessoas.ToListAsync()
        );

        //GET{ID}
        group.MapGet("/pessoas/{id}", async (AppDatabase db, int id) => 
        
            await db.Pessoas.FindAsync(id) is Pessoa pessoa
            ? Results.Ok(pessoa)
            : Results.NotFound()
        );

        group.MapPost("/pessoas", async(AppDatabase db, Pessoa pessoa) =>
        {
            db.Pessoas.Add(pessoa);
            await db.SaveChangesAsync();
            return Results.Created($"/pessoas/{pessoa.Id}", pessoa);
        });

        //DELETE
        group.MapDelete("/pessoas/{id}", async(AppDatabase db, int id) => {{

            if(await db.Pessoas.FindAsync(id) is Pessoa pessoa) {
                db.Remove(pessoa);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        }});

        //PUT
        group.MapPut("/pessoas/{id}", async(AppDatabase db, int id, Pessoa pessoaAlterado) =>
        {
            var pessoa = await db.Pessoas.FindAsync(id);
            if (pessoa is null) return Results.NotFound();

            pessoa.Nome = pessoaAlterado.Nome;
            pessoa.Idade = pessoaAlterado.Idade;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}