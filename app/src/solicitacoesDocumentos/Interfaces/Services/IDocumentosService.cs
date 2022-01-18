
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface IDocumentosService
    {

        Task<EDocumentos> Save(EDocumentos obj);

        Task<IEnumerable<EDocumentos>> GetAll();
        EDocumentos GetByID(int id);
    }
}