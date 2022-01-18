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
    [Route("/status-solicitacao")]

    public class StatusSolicitacaoController : ControllerBase
    {
        private readonly ICrudService<EStatusSolicitacao> _iCrudServicesStatusSolicitacao;
        private readonly IStatusSolicitacaoService _statusSolicitacaoService;

        public StatusSolicitacaoController(ICrudService<EStatusSolicitacao> iCrudServicesStatusSolicitacao, IStatusSolicitacaoService statusSolicitacaoService)
        {
            _iCrudServicesStatusSolicitacao = iCrudServicesStatusSolicitacao;
            _statusSolicitacaoService = statusSolicitacaoService;
        }


        [HttpGet("get-all", Name = "GetAllStatus")]

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> GetAllStatus()
        {
            Response response = new Response();

            try
            {
                var resp = _statusSolicitacaoService.GetAllStatus();
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
        [HttpPost("save-status")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> Insert([FromBody] EStatusSolicitacao obj)
        {
            Response response = new Response();
            try
            {
                var resp = _iCrudServicesStatusSolicitacao.Insert(obj);
                return Ok(response);

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }


        [HttpGet("/get-by-id/{id}", Name = "GetById")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            Response response = new Response();
            var email = User.Claims.FirstOrDefault(x => x.Type == "mail")?.Value;
            try
            {
                var user = _statusSolicitacaoService.GetAllStatus();
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

    }
}