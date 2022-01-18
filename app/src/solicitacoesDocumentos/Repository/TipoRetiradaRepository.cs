using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using solicitacoesDocumentos.DTOS;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Repository
{
    public class TipoRetiradaRepository : ITipoRetiradaRepository
    {
        private readonly ContextDB _contextDb;
        public TipoRetiradaRepository(ContextDB contextDb)
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


        public Task<ETipoRetirada> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ETipoRetirada>> Select()
        {
            throw new NotImplementedException();
        }

        public async Task<ETipoRetirada> Update(ETipoRetirada item, int id)
        {
            var ETipoRetirada = _contextDb.ETipoRetirada.Update(item);
            await _contextDb.SaveChangesAsync();
            return ETipoRetirada.Entity;
        }

        public List<ETipoRetirada> GetAllTiposRetirada()
        {
            return _contextDb.ETipoRetirada.ToList();
        }

        public Task<ETipoRetirada> Insert(ETipoRetirada item)
        {
            throw new NotImplementedException();
        }

        public ETipoRetirada GetByID(int id)
        {
            // Console.WriteLine(JsonSerializer.Serialize(_contextDb.ETipoRetirada.Where((e) => e.id == id).FirstOrDefault()));
            Console.WriteLine("asfjsdvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvh");
            return _contextDb.ETipoRetirada.Where((e) => e.id == id).FirstOrDefault();
        }
    }
}
