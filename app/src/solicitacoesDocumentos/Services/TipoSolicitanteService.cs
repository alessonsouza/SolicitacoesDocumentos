using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class TipoSolicitanteService : CrudService<ETipoRequerente>, ITipoSolicitanteService
    {

        private readonly ITipoSolicitanteRepository _solicitanteRepository;
        public TipoSolicitanteService(ITipoSolicitanteRepository solicitanteRepository) : base(solicitanteRepository)
        {
            _solicitanteRepository = solicitanteRepository;
        }

        public List<ETipoRequerente> GetAllSolicitantes()
        {
            return _solicitanteRepository.GetAllSolicitantes();

        }

        // public List<EPerfil> GetPerfilByChave(string email, string chave)
        // {
        //     var perfils = _usuarioRepository.GetPerfilByChave(email, chave);
        //     return perfils;

        // }

        // public List<ETipoRequerente> GetTipoSolicitanteByGroups(ETipoRequerente TipoSolicitante, List<EPerfil> chave)
        // {
        //     List<EPerfil> perfils = new List<EPerfil>();
        //     Console.WriteLine(JsonSerializer.Serialize(chave));
        //     chave.ForEach((per) =>
        //     {
        //         if (TipoSolicitante.perfils.Any(a => a.chave == per.chave || a.chave == "PRF_ADMIN"))
        //         {
        //             Console.WriteLine("Lua");
        //             if (per.chave == "PRF_QUALIDADE_ADM" || per.chave == "PRF_ADMIN")
        //             {
        //                 perfils?.Add(new EPerfil { chave = "PRF_AUDITORIA_ADM" });
        //                 if (per.chave == "PRF_ADMIN")
        //                 {
        //                     perfils?.Add(new EPerfil { chave = "PRF_QUALIDADE_ADM" });
        //                     perfils?.Add(new EPerfil { chave = "PRF_AUDITORIA_CONCORRENTE_ADM" });
        //                 }
        //             }
        //             perfils?.Add(per);
        //         }
        //     });

        //     try
        //     {
        //         return _usuarioRepository.GetUsuarioGroup(TipoSolicitante, perfils);
        //     }
        //     catch (Exception e)
        //     {
        //         throw new Exception(e.Message);
        //     }
        // }

        // public ETipoRequerente GetUsuarioByEmail(string email)
        // {
        //     try
        //     {
        //         return _usuarioRepository.GetPerfilByTipoSolicitante(email);
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine("a" + e.Message);
        //         throw new Exception();
        //     }
        // }
        public ETipoRequerente GetByID(int id)
        {
            try
            {
                return _solicitanteRepository.GetByID(id);
            }
            catch (Exception e)
            {
                Console.WriteLine("a" + e.Message);
                throw new Exception();
            }
        }


    }
}