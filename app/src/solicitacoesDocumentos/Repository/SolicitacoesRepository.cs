using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Repository
{
    public class SolicitacoesRepository : ISolicitacoesRepository
    {
        private readonly ContextDB _contextDb;
        public readonly IMailService _mailService;
        public SolicitacoesRepository(ContextDB contextDb, IMailService mailService)
        {
            _mailService = mailService;
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

        public async Task<IEnumerable<ESolicitacao>> GetAll()
        {
            return await _contextDb.Solicitacao.
            Include(e => e.MotivoSolicitacao).
            Include(e => e.StatusSolicitacao).
            Include(e => e.TipoDocumento).
            Include(e => e.TipoRequerente).
            Include(e => e.TipoRetirada).
            Include(e => e.Documentos)
            .ToListAsync();
        }

        public List<EPerfil> GetPerfilByChave(string email, string chave)
        {
            return _contextDb.Perfil.ToList();
        }

        // public ESolicitacao GetPerfilBySolicitacao(string email)
        // {
        //     return _contextDb.Solicitacao.Include(o => o.perfils).Where((e) => e.email == email).FirstOrDefault();
        // }

        // public List<ESolicitacao> GetUsuarioGroup(ESolicitacao Solicitacao, List<EPerfil> chave)
        // {
        //     List<String> ids = new List<string>();

        //     foreach (EPerfil per in chave)
        //     {
        //         ids.Add(per.chave);
        //     }

        //     Console.WriteLine(JsonSerializer.Serialize(ids));

        //     return _contextDb.Solicitacao.Where((a) => a.perfils.Any(p => ids.Contains(p.chave))).Include(b => b.perfils).ToList();
        // }

        public async Task<ESolicitacao> Insert(ESolicitacao item)
        {
            Console.WriteLine(JsonSerializer.Serialize(item));
            var Solicitacao = await _contextDb.Solicitacao.AddAsync(item);
            await _contextDb.SaveChangesAsync();
            return Solicitacao.Entity;
        }

        public Task<ESolicitacao> Select(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ESolicitacao>> Select()
        {
            throw new NotImplementedException();
        }

        public async Task<ESolicitacao> Update(ESolicitacao item, int id)
        {
            var Solicitacao = _contextDb.Solicitacao.Update(item);
            await _contextDb.SaveChangesAsync();


            string body = @"Prezado(a), " + Solicitacao.Entity.NomeSolicitannte +
                                "<br></br> Informamos que a sua solicitação foi aprovada, e os documentos já estão disponíveis para download !!" + @"<br></br>
                                Acesse pelo link : https://localhost:5001/files-requested/" + Solicitacao.Entity.id;

            var mailReq = new EmailRequest();
            mailReq.ToEmail = "alesson@com.br";
            mailReq.Subject = "Solicitação de Documentos.";
            mailReq.Body = body;
            await _mailService.SendEmailAsync(mailReq);

            return Solicitacao.Entity;
        }

        public async Task<IEnumerable<ESolicitacao>> GetSoliciById(int id)
        {
            return await _contextDb.Solicitacao.
            Include(e => e.MotivoSolicitacao).
            Include(e => e.StatusSolicitacao).
            Include(e => e.TipoDocumento).
            Include(e => e.TipoRequerente).
            Include(e => e.TipoRetirada).
            Include(e => e.Documentos)
            .Where(e => e.id == id)
            .ToListAsync();
        }
    }
}
