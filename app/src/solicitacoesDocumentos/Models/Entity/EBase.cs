using System;
using System.ComponentModel.DataAnnotations;

namespace solicitacoesDocumentos.Models.Entity
{
    public class EBase
    {
        [Key]
        public int id { get; set; }
        public DateTime created_at { get; set; }
    }
}
