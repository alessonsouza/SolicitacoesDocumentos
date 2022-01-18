using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface IStatusSolicitacaoRepository : IGenericRepository<EStatusSolicitacao>
    {
        List<EStatusSolicitacao> GetAllStatus();

        EStatusSolicitacao GetById(int id);
    }
}
