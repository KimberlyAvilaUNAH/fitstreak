using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitStreak.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueRoutineNameIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RoutinesGlobales_Nombre",
                table: "RoutinesGlobales",
                column: "Nombre",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RoutinesGlobales_Nombre",
                table: "RoutinesGlobales");
        }
    }
}
