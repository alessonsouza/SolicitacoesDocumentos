using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class UserService : CrudService<EUser>, IUserService
    {

        private readonly IUserRepository _usuarioRepository;
        public UserService(IUserRepository usuarioRepository) : base(usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<IEnumerable<EPerfil>> GetPerfilByChave(string email, string chave)
        {
            var perfils = await _usuarioRepository.GetPerfilByChave(email, chave);
            return perfils;

        }

        public List<EUser> GetUserByGroups(EUser user, List<EPerfil> chave)
        {
            List<EPerfil> perfils = new List<EPerfil>();
            Console.WriteLine(JsonSerializer.Serialize(chave));
            chave.ForEach((per) =>
            {
                if (user.perfils.Any(a => a.chave == per.chave || a.chave == "PRF_ADMIN"))
                {
                    Console.WriteLine("Lua");
                    if (per.chave == "PRF_QUALIDADE_ADM" || per.chave == "PRF_ADMIN")
                    {
                        perfils?.Add(new EPerfil { chave = "PRF_AUDITORIA_ADM" });
                        if (per.chave == "PRF_ADMIN")
                        {
                            perfils?.Add(new EPerfil { chave = "PRF_QUALIDADE_ADM" });
                            perfils?.Add(new EPerfil { chave = "PRF_AUDITORIA_CONCORRENTE_ADM" });
                        }
                    }
                    perfils?.Add(per);
                }
            });

            try
            {
                return _usuarioRepository.GetUsuarioGroup(user, perfils);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public EUser GetUsuarioByEmail(string email)
        {
            try
            {
                return _usuarioRepository.GetPerfilByUser(email);
            }
            catch (Exception e)
            {
                Console.WriteLine("a" + e.Message);
                throw new Exception();
            }
        }
        public EUser GetById(string email, int id)
        {
            try
            {
                return _usuarioRepository.GetById(email, id);
            }
            catch (Exception e)
            {
                Console.WriteLine("a" + e.Message);
                throw new Exception();
            }
        }

        public async Task<IEnumerable<EPerfil>> GetAllPerfil()
        {
            return await _usuarioRepository.GetAllPerfis();
        }

        public async Task<EUser> NewUser(EUser obj)
        {
            return await _usuarioRepository.Insert(obj);
        }
    }
}