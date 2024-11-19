using Microsoft.EntityFrameworkCore;

public class AppDatabase : DbContext 
{
    public required DbSet<Pessoa> Pessoas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder) 
    {
        builder.UseMySQL("server=localhost;port=3306;database=projeto;user=root;password=1234");
    }
}
