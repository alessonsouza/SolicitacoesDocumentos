using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class EPerfil : EBase
    {
        public string chave { get; set; }
        public string descricao { get; set; }
        public List<EUser> usuarios { get; set; }

    }

}