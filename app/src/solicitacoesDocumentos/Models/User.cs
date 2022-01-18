using System;
using System.Collections.Generic;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Models
{
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string login { get; set; }
        public int status { get; set; }
        public DateTime created_at { get; set; }
        public List<EPerfil> perfils { get; set; }

    }
}