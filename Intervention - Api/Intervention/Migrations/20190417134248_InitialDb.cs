using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Interventions.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoriesProbleme",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    prenom = table.Column<string>(maxLength: 50, nullable: false),
                    nom = table.Column<string>(maxLength: 50, nullable: false),
                    noTypeProbleme = table.Column<int>(nullable: false),
                    courriel = table.Column<string>(maxLength: 100, nullable: true),
                    courrielConfirmation = table.Column<string>(maxLength: 100, nullable: true),
                    telephone = table.Column<string>(maxLength: 10, nullable: true),
                    notification = table.Column<string>(maxLength: 20, nullable: false),
                    noUnite = table.Column<string>(maxLength: 20, nullable: true),
                    descriptionProbleme = table.Column<string>(maxLength: 500, nullable: false),
                    dateProbleme = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriesProbleme", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Probleme",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    descriptionTypeProbleme = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Probleme", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriesProbleme");

            migrationBuilder.DropTable(
                name: "Probleme");
        }
    }
}
