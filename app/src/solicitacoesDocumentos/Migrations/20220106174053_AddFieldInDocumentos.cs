using Microsoft.EntityFrameworkCore.Migrations;

namespace teste_react.Migrations
{
    public partial class AddFieldInDocumentos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "origem",
                table: "documentos",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "origem",
                table: "documentos");
        }
    }
}
