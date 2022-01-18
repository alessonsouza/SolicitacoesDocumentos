using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Services.Security
{
    public interface ITokenService
    {
        string GenerateToken(EUser user);
    }
}