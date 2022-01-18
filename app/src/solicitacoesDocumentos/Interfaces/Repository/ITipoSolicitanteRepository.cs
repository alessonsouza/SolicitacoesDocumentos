using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface ITipoSolicitanteRepository : IGenericRepository<ETipoRequerente>
    {
        List<ETipoRequerente> GetAllSolicitantes();
        ETipoRequerente GetByID(int id);
    }
}
