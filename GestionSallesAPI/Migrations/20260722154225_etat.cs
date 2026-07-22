using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionSallesAPI.Migrations
{
    /// <inheritdoc />
    public partial class etat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Etat",
                table: "Salles",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Etat",
                table: "Salles");
        }
    }
}
