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
    [Route("/tipo-retirada")]

    public class TipoRetiradaController : ControllerBase
    {
        private readonly ICrudService<ETipoRetirada> _iCrudServicesTipoRetirada;
        private readonly ITipoRetiradaService _tipoRetiradaService;

        public TipoRetiradaController(ICrudService<ETipoRetirada> iCrudServicesTipoRetirada, ITipoRetiradaService tipoRetiradaService)
        {
            _iCrudServicesTipoRetirada = iCrudServicesTipoRetirada;
            _tipoRetiradaService = tipoRetiradaService;
        }


        [HttpGet("get-all")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> GetAllTipoRetirada()
        {
            Response response = new Response();

            try
            {
                var resp = _tipoRetiradaService.GetAllTiposRetirada();
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
        public async Task<IActionResult> Insert([FromBody] ETipoRetirada obj)
        {
            Response response = new Response();
            try
            {
                var resp = _iCrudServicesTipoRetirada.Insert(obj);
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