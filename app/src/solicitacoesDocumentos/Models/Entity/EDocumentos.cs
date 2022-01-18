

using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class EDocumentos : EBase
    {
        public int size { get; set; }
        public string fileName { get; set; }
        public string path { get; set; }

        public string origem { get; set; }

        public ESolicitacao Solicitacao { get; set; }
    }
}