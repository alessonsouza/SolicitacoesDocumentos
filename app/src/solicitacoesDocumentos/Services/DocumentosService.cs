
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class DocumentosService : CrudService<EDocumentos>, IDocumentosService
    {

        private readonly IDocumentosRepository _documentosRepository;
        public DocumentosService(IDocumentosRepository documentosRepository) : base(documentosRepository)
        {
            _documentosRepository = documentosRepository;
        }

        public async Task<IEnumerable<EDocumentos>> GetAll()
        {
            return await _documentosRepository.GetAll();
        }

        public EDocumentos GetByID(int id)
        {
            return _documentosRepository.GetByID(id);
        }

        public async Task<EDocumentos> Save(EDocumentos obj)
        {
            return await _documentosRepository.Insert(obj);
        }
    }
}