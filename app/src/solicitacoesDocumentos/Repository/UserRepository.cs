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
    public class UserRepository : IUserRepository
    {
        private readonly ContextDB _contextDb;
        public UserRepository(ContextDB contextDb)
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

        public async Task<IEnumerable<EPerfil>> GetPerfilByChave(string email, string chave)
        {
            return await _contextDb.Perfil.Where(e => e.chave == chave).ToListAsync();
        }

        public EUser GetPerfilByUser(string email)
        {
            return _contextDb.User.Include(o => o.perfils).Where((e) => e.email == email).FirstOrDefault();
        }


        public EUser GetById(string email, int id)
        {
            return _contextDb.User.Where((e) => e.email == email && e.id == id).FirstOrDefault();
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

        public async Task<IEnumerable<EPerfil>> GetAllPerfis()
        {
            return _contextDb.Perfil.ToList();
        }
    }
}
