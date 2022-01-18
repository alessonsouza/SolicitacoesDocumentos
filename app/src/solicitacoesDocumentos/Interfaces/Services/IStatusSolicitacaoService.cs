using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface IStatusSolicitacaoService
    {
        List<EStatusSolicitacao> GetAllStatus();
        EStatusSolicitacao GetById(int id);
    }
}