
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class SolicitacoesService : CrudService<ESolicitacao>, ISolicitacoesService
    {

        private readonly ISolicitacoesRepository _solicitacoesoRepository;
        public SolicitacoesService(ISolicitacoesRepository solicitacoesoRepository) : base(solicitacoesoRepository)
        {
            _solicitacoesoRepository = solicitacoesoRepository;
        }

        public async Task<IEnumerable<ESolicitacao>> GetAll()
        {
            return await _solicitacoesoRepository.GetAll();
        }

        public async Task<IEnumerable<ESolicitacao>> GetbyId(int id)
        {
            return await _solicitacoesoRepository.GetSoliciById(id);
        }

        public async Task<ESolicitacao> Save(ESolicitacao obj)
        {
            return await _solicitacoesoRepository.Insert(obj);
        }

        public async Task<ESolicitacao> UpdateSolicitacao(ESolicitacao obj)
        {
            return await _solicitacoesoRepository.Update(obj, obj.id);
        }
    }
}