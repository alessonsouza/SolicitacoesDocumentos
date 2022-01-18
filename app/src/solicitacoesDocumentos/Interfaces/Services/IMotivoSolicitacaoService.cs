using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface IMotivoSolicitacaoService
    {
        List<EMotivoSolicitacao> GetAllMotivos();
        EMotivoSolicitacao GetByID(int id);
    }
}