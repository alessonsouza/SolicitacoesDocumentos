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
    public class TipoSolicitanteRepository : ITipoSolicitanteRepository
    {
        private readonly ContextDB _contextDb;
        public TipoSolicitanteRepository(ContextDB contextDb)
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

        public EUser GetPerfilByUser(string email)
        {
            return _contextDb.User.Include(o => o.perfils).Where((e) => e.email == email).FirstOrDefault();
        }

        public List<EUser> GetUsuarioGroup(EUser user, List<EPerfil> chave)
        {
            List<String> ids = new List<string>();

            foreach (EPerfil per in chave)
            {
                ids.Add(per.chave);
            }

            Console.WriteLine(JsonSerializer.Serialize(ids));

            return _contextDb.User.Where((a) => a.perfils.Any(p => ids.Contains(p.chave))).Include(b => b.perfils).ToList();
        }

        public async Task<EUser> Insert(EUser item)
        {
            var user = await _contextDb.User.AddAsync(item);
            await _contextDb.SaveChangesAsync();
            return user.Entity;
        }

        public Task<EUser> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EUser>> Select()
        {
            throw new NotImplementedException();
        }

        public async Task<EUser> Update(EUser item, int id)
        {
            var user = _contextDb.User.Update(item);
            await _contextDb.SaveChangesAsync();
            return user.Entity;
        }

        public List<ETipoRequerente> GetAllSolicitantes()
        {
            return _contextDb.ETipoRequerente.ToList();
        }

        public Task<ETipoRequerente> Insert(ETipoRequerente item)
        {
            throw new NotImplementedException();
        }

        public Task<ETipoRequerente> Update(ETipoRequerente item, int id)
        {
            throw new NotImplementedException();
        }

        Task<ETipoRequerente> IGenericRepository<ETipoRequerente>.Select(int id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<ETipoRequerente>> IGenericRepository<ETipoRequerente>.Select()
        {
            throw new NotImplementedException();
        }

        public ETipoRequerente GetByID(int id)
        {
            // Console.WriteLine(JsonSerializer.Serialize(_contextDb.ETipoRetirada.Where((e) => e.id == id).FirstOrDefault()));
            Console.WriteLine("asfjsdvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvh");
            return _contextDb.ETipoRequerente.Where((e) => e.id == id).FirstOrDefault();
        }
    }
}
