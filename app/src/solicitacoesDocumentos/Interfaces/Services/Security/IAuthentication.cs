using System.Threading.Tasks;
using solicitacoesDocumentos.Models;

namespace solicitacoesDocumentos.Interfaces.Services.Security
{
    public interface IAuthentication
    {
        Task<User> Autenthicate(string username, string password);
        bool BelongToGroup(string groupName);

    }
}