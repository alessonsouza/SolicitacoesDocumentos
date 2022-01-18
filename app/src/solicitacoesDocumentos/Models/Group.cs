using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Models
{
    public class Group
    {
        public string GroupName { get; set; }
        public List<EPerfil> chave { get; set; }
    }
}