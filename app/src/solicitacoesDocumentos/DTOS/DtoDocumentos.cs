

using System;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.DTOS
{
    public class DtoDocumentos
    {
        public int id { get; set; }
        public int size { get; set; }
        public string fileName { get; set; }
        public string path { get; set; }
        public string origem { get; set; }

        public DtoSolicitacao Solicitacao { get; set; }
    }
}