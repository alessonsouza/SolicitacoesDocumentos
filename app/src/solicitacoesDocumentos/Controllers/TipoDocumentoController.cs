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
    [Route("/tipo-documentos")]

    public class TipoDocumentoController : ControllerBase
    {
        private readonly ICrudService<ETipoDocumento> _iCrudServicesDocumentos;
        private readonly ITipoDocumentoService _documentoService;

        public TipoDocumentoController(ICrudService<ETipoDocumento> iCrudServicesDocumentos, ITipoDocumentoService documentoService)
        {
            _iCrudServicesDocumentos = iCrudServicesDocumentos;
            _documentoService = documentoService;
        }


        [HttpGet("get-all", Name = "GetAllDocumento")]

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> GetAllDocumento()
        {
            Response response = new Response();

            try
            {
                var resp = _documentoService.GetAllDocumentos();
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
        [HttpPost("save-documento")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> Insert([FromBody] ETipoDocumento obj)
        {
            Response response = new Response();
            try
            {
                var resp = _iCrudServicesDocumentos.Insert(obj);
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
                var user = _documentoService.GetAllDocumentos();
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