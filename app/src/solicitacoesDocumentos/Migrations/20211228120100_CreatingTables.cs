using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace teste_react.Migrations
{
    public partial class CreatingTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "motivo_solicitacao",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    descMotivo = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_motivo_solicitacao", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "profile",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    chave = table.Column<string>(type: "text", nullable: true),
                    descricao = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profile", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "status_solicitacao",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    descStatus = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_status_solicitacao", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tipo_documento",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    status = table.Column<int>(type: "int", nullable: false),
                    descDocumento = table.Column<string>(type: "text", nullable: true),
                    prazo = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipo_documento", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tipo_requerente",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    descRequerente = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipo_requerente", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tipo_retirada",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    status = table.Column<int>(type: "int", nullable: false),
                    descRetirada = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipo_retirada", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    login = table.Column<string>(type: "text", nullable: true),
                    password = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "solicitacao",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    NomePaciente = table.Column<string>(type: "text", nullable: true),
                    CPFPaciente = table.Column<string>(type: "text", nullable: true),
                    RGPaciente = table.Column<string>(type: "text", nullable: true),
                    DataNascPaciente = table.Column<DateTime>(type: "datetime", nullable: false),
                    Telefone = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    NomeSolicitannte = table.Column<string>(type: "text", nullable: true),
                    RGSolicitante = table.Column<string>(type: "text", nullable: true),
                    CPFSolicitante = table.Column<string>(type: "text", nullable: true),
                    DataSolicitacao = table.Column<DateTime>(type: "datetime", nullable: false),
                    ConfirmacaoLeitura = table.Column<int>(type: "int", nullable: false),
                    GrauParentesco = table.Column<string>(type: "text", nullable: true),
                    TipoRequerenteid = table.Column<int>(type: "int", nullable: true),
                    TipoDocumentoid = table.Column<int>(type: "int", nullable: true),
                    StatusSolicitacaoid = table.Column<int>(type: "int", nullable: true),
                    MotivoSolicitacaoid = table.Column<int>(type: "int", nullable: true),
                    TipoRetiradaid = table.Column<int>(type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_solicitacao", x => x.id);
                    table.ForeignKey(
                        name: "FK_solicitacao_motivo_solicitacao_MotivoSolicitacaoid",
                        column: x => x.MotivoSolicitacaoid,
                        principalTable: "motivo_solicitacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_solicitacao_status_solicitacao_StatusSolicitacaoid",
                        column: x => x.StatusSolicitacaoid,
                        principalTable: "status_solicitacao",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_solicitacao_tipo_documento_TipoDocumentoid",
                        column: x => x.TipoDocumentoid,
                        principalTable: "tipo_documento",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_solicitacao_tipo_requerente_TipoRequerenteid",
                        column: x => x.TipoRequerenteid,
                        principalTable: "tipo_requerente",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_solicitacao_tipo_retirada_TipoRetiradaid",
                        column: x => x.TipoRetiradaid,
                        principalTable: "tipo_retirada",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EPerfilEUser",
                columns: table => new
                {
                    perfilsid = table.Column<int>(type: "int", nullable: false),
                    usuariosid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EPerfilEUser", x => new { x.perfilsid, x.usuariosid });
                    table.ForeignKey(
                        name: "FK_EPerfilEUser_profile_perfilsid",
                        column: x => x.perfilsid,
                        principalTable: "profile",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EPerfilEUser_user_usuariosid",
                        column: x => x.usuariosid,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EPerfilEUser_usuariosid",
                table: "EPerfilEUser",
                column: "usuariosid");

            migrationBuilder.CreateIndex(
                name: "IX_solicitacao_MotivoSolicitacaoid",
                table: "solicitacao",
                column: "MotivoSolicitacaoid");

            migrationBuilder.CreateIndex(
                name: "IX_solicitacao_StatusSolicitacaoid",
                table: "solicitacao",
                column: "StatusSolicitacaoid");

            migrationBuilder.CreateIndex(
                name: "IX_solicitacao_TipoDocumentoid",
                table: "solicitacao",
                column: "TipoDocumentoid");

            migrationBuilder.CreateIndex(
                name: "IX_solicitacao_TipoRequerenteid",
                table: "solicitacao",
                column: "TipoRequerenteid");

            migrationBuilder.CreateIndex(
                name: "IX_solicitacao_TipoRetiradaid",
                table: "solicitacao",
                column: "TipoRetiradaid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EPerfilEUser");

            migrationBuilder.DropTable(
                name: "solicitacao");

            migrationBuilder.DropTable(
                name: "profile");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "motivo_solicitacao");

            migrationBuilder.DropTable(
                name: "status_solicitacao");

            migrationBuilder.DropTable(
                name: "tipo_documento");

            migrationBuilder.DropTable(
                name: "tipo_requerente");

            migrationBuilder.DropTable(
                name: "tipo_retirada");
        }
    }
}
