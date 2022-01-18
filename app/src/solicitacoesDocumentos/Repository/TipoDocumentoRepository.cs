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
    public class TipoDocumentoRepository : ITipoDocumentoRepository
    {
        private readonly ContextDB _contextDb;
        public TipoDocumentoRepository(ContextDB contextDb)
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

        public List<ETipoDocumento> GetAllDocumentos()
        {
            return _contextDb.ETipoDocumento.ToList();
        }

        public ETipoDocumento GetByID(int id)
        {
            return _contextDb.ETipoDocumento.Where(d => d.id == id).FirstOrDefault();
        }

        public Task<ETipoDocumento> Insert(ETipoDocumento item)
        {
            throw new NotImplementedException();
        }

        public Task<ETipoDocumento> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ETipoDocumento>> Select()
        {
            throw new NotImplementedException();
        }

        public Task<ETipoDocumento> Update(ETipoDocumento item, int id)
        {
            throw new NotImplementedException();
        }
    }
}
