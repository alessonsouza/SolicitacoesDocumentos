using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Repository
{
    public class AuthenticateRepository : IAuthenticationRepository
    {
        private readonly ContextDB _contextDb;
        public AuthenticateRepository(ContextDB contextDb)
        {
            _contextDb = contextDb;
        }
        public EUser GetUsuario(AuthModel user)
        {
            var userThis = _contextDb.User.Include((a) => a.perfils).Where(
                s => s.login == user.usuario && s.password == user.senha && s.status == 0
            ).FirstOrDefault();

            return userThis;
        }
    }
}
