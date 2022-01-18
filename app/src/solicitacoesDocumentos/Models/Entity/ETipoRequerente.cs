

using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class ETipoRequerente : EBase
    {
        public string descRequerente { get; set; }
        public int status { get; set; }
        // public ESolicitacao Solicitacao { get; set; }
    }
}