

using System;
using System.Collections.Generic;

namespace solicitacoesDocumentos.Models.Entity
{
    public class ESolicitacao : EBase
    {
        public string NomePaciente { get; set; }
        public string CPFPaciente { get; set; }
        public string RGPaciente { get; set; }
        public DateTime DataNascPaciente { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string NomeSolicitannte { get; set; }
        public string RGSolicitante { get; set; }
        public string CPFSolicitante { get; set; }
        public DateTime DataSolicitacao { get; set; }
        public int ConfirmacaoLeitura { get; set; }
        public string GrauParentesco { get; set; }
        public ETipoRequerente TipoRequerente { get; set; }
        public ETipoDocumento TipoDocumento { get; set; }
        public EStatusSolicitacao StatusSolicitacao { get; set; }
        public EMotivoSolicitacao MotivoSolicitacao { get; set; }
        public ETipoRetirada TipoRetirada { get; set; }

        public IEnumerable<EDocumentos> Documentos { get; set; }
    }
}