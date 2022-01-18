using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface ITipoRetiradaService
    {
        List<ETipoRetirada> GetAllTiposRetirada();

        ETipoRetirada GetByID(int id);
    }
}