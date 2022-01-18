using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface IDocumentosRepository : IGenericRepository<EDocumentos>
    {
        // List<ESolicitacao> GetUsuarioGroup(ESolicitacao user, List<EPerfil> chave);
        // ESolicitacao GetPerfilByUser(string user);
        // List<EPerfil> GetPerfilByChave(string email, string chave);

        // IEnumerable<ESolicitacao> GetAll();
        Task<IEnumerable<EDocumentos>> GetAll();

        EDocumentos GetByID(int id);
    }
}
