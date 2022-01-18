using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface ITipoDocumentoRepository : IGenericRepository<ETipoDocumento>
    {
        List<ETipoDocumento> GetAllDocumentos();

        ETipoDocumento GetByID(int id);
    }
}
