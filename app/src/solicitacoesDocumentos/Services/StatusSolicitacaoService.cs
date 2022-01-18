using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class StatusSolicitacaoService : CrudService<EStatusSolicitacao>, IStatusSolicitacaoService
    {

        private readonly IStatusSolicitacaoRepository _statusSolicitacaoRepository;
        public StatusSolicitacaoService(IStatusSolicitacaoRepository statusSolicitacaoRepository) : base(statusSolicitacaoRepository)
        {
            _statusSolicitacaoRepository = statusSolicitacaoRepository;
        }

        public List<EStatusSolicitacao> GetAllStatus()
        {
            return _statusSolicitacaoRepository.GetAllStatus();
        }

        public EStatusSolicitacao GetById(int id)
        {
            return _statusSolicitacaoRepository.GetById(id);
        }
    }
}