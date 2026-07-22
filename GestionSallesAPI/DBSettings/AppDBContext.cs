using GestionSallesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GestionSallesAPI.DBSettings;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Tables
    public DbSet<Salle> Salles { get; set; }
    public DbSet<Batiment> Batiments { get; set; }
    public DbSet<Faculte> Facultes { get; set; }
    public DbSet<Specification> Specifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Enregistrer l'enum Categorie comme texte (optionnel)
        modelBuilder.Entity<Salle>()
            .Property(s => s.Categorie)
            .HasConversion<string>();

        // Relation Faculte (1 -> N)
        modelBuilder.Entity<Salle>()
            .HasOne(s => s.Faculte)
            .WithMany(f => f.Salles)
            .HasForeignKey(s => s.FaculteId);

        // Relation Batiment (1 -> N)
        modelBuilder.Entity<Salle>()
            .HasOne(s => s.Batiment)
            .WithMany(b => b.Salles)
            .HasForeignKey(s => s.BatimentId);

        // Relation Salle <-> Specification (N -> N)
        modelBuilder.Entity<Salle>()
            .HasMany(s => s.Specifications)
            .WithMany(s => s.Salles);

        // Données initiales (Seed Data)
        modelBuilder.Entity<Specification>().HasData(
    new Specification { Id = 1, Nom = "Labo 1" },
    new Specification { Id = 2, Nom = "Labo 2" },
    new Specification { Id = 3, Nom = "Labo 3" },
    new Specification { Id = 4, Nom = "Labo 4" },
    new Specification { Id = 5, Nom = "Labo 5" },
    new Specification { Id = 6, Nom = "Labo 6" },
    new Specification { Id = 7, Nom = "Labo 7" },
    new Specification { Id = 8, Nom = "Labo 8" },
    new Specification { Id = 9, Nom = "Labo 9" },
    new Specification { Id = 10, Nom = "Labo 10" },
    new Specification { Id = 11, Nom = "Labo 11" },
    new Specification { Id = 12, Nom = "Labo 12" },
    new Specification { Id = 13, Nom = "Labo 13" },
    new Specification { Id = 14, Nom = "Labo 14" },
    new Specification { Id = 15, Nom = "Labo 15" },
    new Specification { Id = 16, Nom = "Labo 16" },
    new Specification { Id = 17, Nom = "Labo 17" },
    new Specification { Id = 18, Nom = "Labo 18" },
    new Specification { Id = 19, Nom = "Labo 19" },
    new Specification { Id = 20, Nom = "Labo 20" },
    new Specification { Id = 21, Nom = "Labo 21" },
    new Specification { Id = 22, Nom = "Labo 22" },
    new Specification { Id = 23, Nom = "Labo 23" },
    new Specification { Id = 24, Nom = "Labo 24" },
    new Specification { Id = 25, Nom = "Labo 25" },
    new Specification { Id = 26, Nom = "Labo 26" },
    new Specification { Id = 27, Nom = "Labo 27" },
    new Specification { Id = 28, Nom = "Labo 28" },
    new Specification { Id = 29, Nom = "Labo 29" },
    new Specification { Id = 30, Nom = "Labo 30" }
);
    }
}