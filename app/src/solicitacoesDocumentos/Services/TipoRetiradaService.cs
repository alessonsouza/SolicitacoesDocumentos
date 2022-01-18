using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class TipoRetiradaService : CrudService<ETipoRetirada>, ITipoRetiradaService
    {

        private readonly ITipoRetiradaRepository _tipoRetiradaRepository;
        public TipoRetiradaService(ITipoRetiradaRepository TipoRetiradaRepository) : base(TipoRetiradaRepository)
        {
            _tipoRetiradaRepository = TipoRetiradaRepository;
        }

        public List<ETipoRetirada> GetAllTiposRetirada()
        {
            return _tipoRetiradaRepository.GetAllTiposRetirada();
        }

        public ETipoRetirada GetByID(int id)
        {
            return _tipoRetiradaRepository.GetByID(id);
        }
    }
}