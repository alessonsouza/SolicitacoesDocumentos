using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface ITipoRetiradaRepository : IGenericRepository<ETipoRetirada>
    {
        List<ETipoRetirada> GetAllTiposRetirada();
        ETipoRetirada GetByID(int id);
    }
}
