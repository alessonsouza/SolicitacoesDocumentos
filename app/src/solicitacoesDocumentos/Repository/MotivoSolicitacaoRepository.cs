using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Repository
{
    public class MotivoSolicitacaoRepository : IMotivoSolicitacaoRepository
    {
        private readonly ContextDB _contextDb;
        public MotivoSolicitacaoRepository(ContextDB contextDb)
        {
            _contextDb = contextDb;
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Exist(int id)
        {
            throw new NotImplementedException();
        }


        public Task<EMotivoSolicitacao> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EMotivoSolicitacao>> Select()
        {
            throw new NotImplementedException();
        }

        public async Task<EMotivoSolicitacao> Update(EMotivoSolicitacao item, int id)
        {
            var EMotivoSolicitacao = _contextDb.EMotivoSolicitacao.Update(item);
            await _contextDb.SaveChangesAsync();
            return EMotivoSolicitacao.Entity;
        }

        public List<EMotivoSolicitacao> GetAllMotivos()
        {
            return _contextDb.EMotivoSolicitacao.ToList();
        }

        public Task<EMotivoSolicitacao> Insert(EMotivoSolicitacao item)
        {
            throw new NotImplementedException();
        }

        public EMotivoSolicitacao GetByID(int id)
        {
            return _contextDb.EMotivoSolicitacao.Where(m => m.id == id).FirstOrDefault();
        }
    }
}
