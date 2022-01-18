using System.ComponentModel.DataAnnotations;

namespace solicitacoesDocumentos.Models
{
    public class AuthModel
    {
        [Required]
        public string usuario { get; set; }

        [Required]
        public string senha { get; set; }
    }
}