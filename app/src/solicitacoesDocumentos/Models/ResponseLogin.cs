using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Models
{
    public class ResponseLogin
    {
        public User User { get; set; }
        public string Token { get; set; }
    }
}