using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using solicitacoesDocumentos.Models;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;
using System;

namespace solicitacoesDocumentos.Controllers
{
    [ApiController]
    [Route("/motivo-solicitacao")]

    public class MotivoSolicitacaoController : ControllerBase
    {
        private readonly ICrudService<EMotivoSolicitacao> _iCrudServicesMotivoSolicitacao;
        private readonly IMotivoSolicitacaoService _motivoSolicitacaoService;

        public MotivoSolicitacaoController(ICrudService<EMotivoSolicitacao> iCrudServicesMotivoSolicitacao, IMotivoSolicitacaoService motivoSolicitacaoService)
        {
            _iCrudServicesMotivoSolicitacao = iCrudServicesMotivoSolicitacao;
            _motivoSolicitacaoService = motivoSolicitacaoService;
        }


        [HttpGet("get-all")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> GetAllMotivo()
        {
            Response response = new Response();

            try
            {
                var resp = _motivoSolicitacaoService.GetAllMotivos();
                response.Data = resp;
                response.Success = true;
                return Ok(response);
            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }
        [HttpPost("save-tipo")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> Insert([FromBody] EMotivoSolicitacao obj)
        {
            Response response = new Response();
            try
            {
                var resp = _iCrudServicesMotivoSolicitacao.Insert(obj);
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }



    }
}