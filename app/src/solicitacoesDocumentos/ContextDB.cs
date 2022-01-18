using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos
{
    public class ContextDB : DbContext
    {
        public DbSet<EUser> User { get; set; }
        public DbSet<EPerfil> Perfil { get; set; }
        public DbSet<ESolicitacao> Solicitacao { get; set; }
        public DbSet<ETipoRetirada> ETipoRetirada { get; set; }
        public DbSet<EMotivoSolicitacao> EMotivoSolicitacao { get; set; }
        public DbSet<ETipoRequerente> ETipoRequerente { get; set; }
        public DbSet<ETipoDocumento> ETipoDocumento { get; set; }
        public DbSet<EStatusSolicitacao> EStatusSolicitacao { get; set; }
        public DbSet<EDocumentos> EDocumentos { get; set; }
        public ContextDB(DbContextOptions<ContextDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EUser>().ToTable("user");
            modelBuilder.Entity<EPerfil>().ToTable("profile");
            modelBuilder.Entity<ESolicitacao>().ToTable("solicitacao");
            modelBuilder.Entity<ETipoRetirada>().ToTable("tipo_retirada");
            modelBuilder.Entity<EMotivoSolicitacao>().ToTable("motivo_solicitacao");
            modelBuilder.Entity<ETipoRequerente>().ToTable("tipo_requerente");
            modelBuilder.Entity<ETipoDocumento>().ToTable("tipo_documento");
            modelBuilder.Entity<EStatusSolicitacao>().ToTable("status_solicitacao");
            modelBuilder.Entity<EDocumentos>().ToTable("documentos");
        }
    }
}
