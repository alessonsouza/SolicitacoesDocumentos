using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class MotivoSolicitacaoService : CrudService<EMotivoSolicitacao>, IMotivoSolicitacaoService
    {

        private readonly IMotivoSolicitacaoRepository _motivoSolicitacaoRepository;
        public MotivoSolicitacaoService(IMotivoSolicitacaoRepository MotivoSolicitacaoRepository) : base(MotivoSolicitacaoRepository)
        {
            _motivoSolicitacaoRepository = MotivoSolicitacaoRepository;
        }

        public List<EMotivoSolicitacao> GetAllMotivos()
        {
            return _motivoSolicitacaoRepository.GetAllMotivos();
        }

        public EMotivoSolicitacao GetByID(int id)
        {

            return _motivoSolicitacaoRepository.GetByID(id);
        }
    }
}