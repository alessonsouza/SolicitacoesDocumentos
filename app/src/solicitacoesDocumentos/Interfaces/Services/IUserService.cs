using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface IUserService
    {
        EUser GetUsuarioByEmail(string email);
        List<EUser> GetUserByGroups(EUser user, List<EPerfil> chave);
        Task<IEnumerable<EPerfil>> GetPerfilByChave(string email, string chave);
        Task<IEnumerable<EPerfil>> GetAllPerfil();

        EUser GetById(string email, int id);

        Task<EUser> NewUser(EUser obj);
    }
}