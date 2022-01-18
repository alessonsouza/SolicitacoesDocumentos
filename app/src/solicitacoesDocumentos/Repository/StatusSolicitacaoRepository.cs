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
    public class StatusSolicitacaoRepository : IStatusSolicitacaoRepository
    {
        private readonly ContextDB _contextDb;
        public StatusSolicitacaoRepository(ContextDB contextDb)
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

        public List<EPerfil> GetPerfilByChave(string email, string chave)
        {
            return _contextDb.Perfil.ToList();
        }

        public async Task<EStatusSolicitacao> Insert(EStatusSolicitacao item)
        {
            var EStatusSolicitacao = await _contextDb.EStatusSolicitacao.AddAsync(item);
            await _contextDb.SaveChangesAsync();
            return EStatusSolicitacao.Entity;
        }

        public Task<EStatusSolicitacao> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EStatusSolicitacao>> Select()
        {
            throw new NotImplementedException();
        }

        public async Task<EStatusSolicitacao> Update(EStatusSolicitacao item, int id)
        {
            var EStatusSolicitacao = _contextDb.EStatusSolicitacao.Update(item);
            await _contextDb.SaveChangesAsync();
            return EStatusSolicitacao.Entity;
        }

        public List<EStatusSolicitacao> GetAllSolicitantes()
        {
            return _contextDb.EStatusSolicitacao.ToList();
        }

        public List<EStatusSolicitacao> GetAllStatus()
        {
            return _contextDb.EStatusSolicitacao.ToList();
        }

        public EStatusSolicitacao GetById(int id)
        {
            return _contextDb.EStatusSolicitacao.Where(e => e.id == id).FirstOrDefault();
        }
    }
}
