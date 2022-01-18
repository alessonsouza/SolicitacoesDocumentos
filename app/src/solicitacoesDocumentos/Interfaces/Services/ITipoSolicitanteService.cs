using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface ITipoSolicitanteService
    {
        List<ETipoRequerente> GetAllSolicitantes();
        ETipoRequerente GetByID(int id);
    }
}