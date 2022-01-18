using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface ITipoDocumentoService
    {
        List<ETipoDocumento> GetAllDocumentos();
        ETipoDocumento GetByID(int id);
    }
}