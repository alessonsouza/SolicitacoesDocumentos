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
    [Route("/tipo-solicitante")]

    public class TIpoSolicitanteController : ControllerBase
    {
        private readonly ICrudService<ETipoRequerente> _iCrudServicesolicitante;
        private readonly ITipoSolicitanteService _solicitanteService;

        public TIpoSolicitanteController(ICrudService<ETipoRequerente> iCrudServicesolicitante, ITipoSolicitanteService solicitanteService)
        {
            _iCrudServicesolicitante = iCrudServicesolicitante;
            _solicitanteService = solicitanteService;
        }


        [HttpGet("get-all")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> GetAllSolicitantes()
        {
            Response response = new Response();

            try
            {
                var resp = _solicitanteService.GetAllSolicitantes();
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
        [HttpPost("post", Name = "Insert")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> Insert([FromBody] ETipoRequerente post)
        {
            Response response = new Response();
            try
            {
                var resp = _iCrudServicesolicitante.Insert(post);
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            Response response = new Response();
            var email = User.Claims.FirstOrDefault(x => x.Type == "mail")?.Value;
            try
            {
                var user = _solicitanteService.GetAllSolicitantes();
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