using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface IMotivoSolicitacaoRepository : IGenericRepository<EMotivoSolicitacao>
    {
        List<EMotivoSolicitacao> GetAllMotivos();
        EMotivoSolicitacao GetByID(int id);
    }
}
