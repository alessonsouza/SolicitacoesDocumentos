

using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class ETipoDocumento : EBase
    {
        public int status { get; set; }
        public string descDocumento { get; set; }
        public string prazo { get; set; }

        // public ESolicitacao Solicitacao { get; set; }
    }
}