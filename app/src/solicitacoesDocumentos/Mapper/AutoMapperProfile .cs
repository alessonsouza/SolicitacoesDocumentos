
using AutoMapper;
using solicitacoesDocumentos.DTOS;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            AllowNullCollections = true;
            AllowNullCollections = true;


            CreateMap<EUser, DtoUser>().ReverseMap();
            CreateMap<ETipoRetirada, DtoTipoRetirada>().ReverseMap();
            CreateMap<EStatusSolicitacao, DtoStatusSolicitacao>().ReverseMap();
            CreateMap<ETipoDocumento, DtoTipoDocumento>().ReverseMap();
            CreateMap<ETipoRequerente, DtoTipoRequerente>().ReverseMap();
            CreateMap<EMotivoSolicitacao, DtoMotivoSolicitacao>().ReverseMap();
            CreateMap<ESolicitacao, DtoSolicitacao>().ReverseMap();
            CreateMap<EDocumentos, DtoDocumentos>().ReverseMap();

        }
    }
}