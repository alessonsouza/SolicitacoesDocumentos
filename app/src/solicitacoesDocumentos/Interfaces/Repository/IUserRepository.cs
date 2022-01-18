using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface IUserRepository : IGenericRepository<EUser>
    {
        List<EUser> GetUsuarioGroup(EUser user, List<EPerfil> chave);
        EUser GetPerfilByUser(string user);
        Task<IEnumerable<EPerfil>> GetPerfilByChave(string email, string chave);
        Task<IEnumerable<EPerfil>> GetAllPerfis();

        EUser GetById(string email, int id);
    }
}
