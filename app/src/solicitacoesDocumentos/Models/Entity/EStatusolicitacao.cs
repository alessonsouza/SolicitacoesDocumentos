

using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class EStatusSolicitacao : EBase
    {
        public string descStatus { get; set; }
        public int status { get; set; }

        // public ESolicitacao Solicitacao { get; set; }
    }
}