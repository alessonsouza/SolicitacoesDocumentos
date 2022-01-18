
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface ISolicitacoesService
    {

        Task<ESolicitacao> Save(ESolicitacao obj);
        Task<ESolicitacao> UpdateSolicitacao(ESolicitacao obj);

        Task<IEnumerable<ESolicitacao>> GetAll();
        Task<IEnumerable<ESolicitacao>> GetbyId(int id);

    }
}