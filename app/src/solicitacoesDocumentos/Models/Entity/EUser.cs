using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class EUser : EBase
    {
        public string name { get; set; }
        public string email { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public int status { get; set; }
        public List<EPerfil> perfils { get; set; }
    }
}
