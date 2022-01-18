using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class TipoDocumentoService : CrudService<ETipoDocumento>, ITipoDocumentoService
    {

        private readonly ITipoDocumentoRepository _documentoRepository;
        public TipoDocumentoService(ITipoDocumentoRepository documentoRepository) : base(documentoRepository)
        {
            _documentoRepository = documentoRepository;
        }

        public List<ETipoDocumento> GetAllDocumentos()
        {
            return _documentoRepository.GetAllDocumentos();

        }

        public ETipoDocumento GetByID(int id)
        {
            return _documentoRepository.GetByID(id);
        }

        // public List<EPerfil> GetPerfilByChave(string email, string chave)
        // {
        //     var perfils = _usuarioRepository.GetPerfilByChave(email, chave);
        //     return perfils;

        // }

        // public List<ETipoDocumento> GetTipodocumentoByGroups(ETipoDocumento Tipodocumento, List<EPerfil> chave)
        // {
        //     List<EPerfil> perfils = new List<EPerfil>();
        //     Console.WriteLine(JsonSerializer.Serialize(chave));
        //     chave.ForEach((per) =>
        //     {
        //         if (Tipodocumento.perfils.Any(a => a.chave == per.chave || a.chave == "PRF_ADMIN"))
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
        //         return _usuarioRepository.GetUsuarioGroup(Tipodocumento, perfils);
        //     }
        //     catch (Exception e)
        //     {
        //         throw new Exception(e.Message);
        //     }
        // }

        // public ETipoDocumento GetUsuarioByEmail(string email)
        // {
        //     try
        //     {
        //         return _usuarioRepository.GetPerfilByTipodocumento(email);
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine("a" + e.Message);
        //         throw new Exception();
        //     }
        // }
        // public List<ETipoDocumento> GetById(string email, int id)
        // {
        //     try
        //     {
        //         return _documentoRepository.GetAlldocumentos();
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine("a" + e.Message);
        //         throw new Exception();
        //     }
        // }
    }
}