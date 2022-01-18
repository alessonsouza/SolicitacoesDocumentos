using System.Threading.Tasks;
using solicitacoesDocumentos.Models;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface IMailService
    {
        Task SendEmailAsync(EmailRequest emailRequest);
    }
}
