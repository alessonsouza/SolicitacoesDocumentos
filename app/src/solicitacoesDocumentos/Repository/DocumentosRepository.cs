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
    public class DocumentosRepository : IDocumentosRepository
    {
        private readonly ContextDB _contextDb;
        public DocumentosRepository(ContextDB contextDb)
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

        public async Task<EDocumentos> Insert(EDocumentos item)
        {
            item.created_at = DateTime.Now;
            Console.WriteLine(JsonSerializer.Serialize(item));
            var EDocumentos = await _contextDb.EDocumentos.AddAsync(item);
            await _contextDb.SaveChangesAsync();
            return EDocumentos.Entity;
        }

        public Task<EDocumentos> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EDocumentos>> Select()
        {
            throw new NotImplementedException();
        }

        public async Task<EDocumentos> Update(EDocumentos item, int id)
        {

            var EDocumentos = _contextDb.EDocumentos.Update(item);
            await _contextDb.SaveChangesAsync();
            return EDocumentos.Entity;
        }

        public async Task<IEnumerable<EDocumentos>> GetAll()
        {
            return await _contextDb.EDocumentos.ToListAsync();

        }

        Task<EDocumentos> IGenericRepository<EDocumentos>.Select(int id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<EDocumentos>> IGenericRepository<EDocumentos>.Select()
        {
            throw new NotImplementedException();
        }

        public EDocumentos GetByID(int id)
        {
            return _contextDb.EDocumentos.Where(e => e.Solicitacao.id == id).OrderByDescending(e => e.created_at).FirstOrDefault();
        }
    }
}
