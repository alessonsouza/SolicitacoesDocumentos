using System.Threading.Tasks;
using solicitacoesDocumentos.Models;

namespace solicitacoesDocumentos.Interfaces.Services.Security
{
    public interface ILogin
    {
        Task<ResponseLogin> Authenticate(Login login);
    }
}