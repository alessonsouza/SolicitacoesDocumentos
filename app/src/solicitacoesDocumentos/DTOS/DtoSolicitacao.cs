

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace solicitacoesDocumentos.DTOS
{
    public class DtoSolicitacao
    {
        public int id { get; set; }
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
        public DtoTipoRequerente TipoRequerente { get; set; }
        public DtoTipoDocumento TipoDocumento { get; set; }
        public DtoStatusSolicitacao StatusSolicitacao { get; set; }
        public DtoMotivoSolicitacao MotivoSolicitacao { get; set; }
        public DtoTipoRetirada TipoRetirada { get; set; }

        public IEnumerable<DtoDocumentos> Documentos { get; set; }
    }
}