

using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using solicitacoesDocumentos.DTOS;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace prontuarioAuditoria.Controllers
{
    [ApiController]
    [Route("/solicitacoes")]

    // [ApiController]

    public class SolcitacoesController : ControllerBase
    {
        private readonly ICrudService<ESolicitacao> _iCrudServiceSolicitacao;
        private readonly ISolicitacoesService _solicitacaoService;
        private readonly ITipoRetiradaService _retiradaService;
        private readonly ITipoSolicitanteService _solicitanteService;
        private readonly IStatusSolicitacaoService _statusService;
        private readonly IMotivoSolicitacaoService _motivoService;
        private readonly ITipoDocumentoService _tipoDocumentoService;
        private readonly IDocumentosService _documentoService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public SolcitacoesController(ICrudService<ESolicitacao> iCrudServiceSolicitacao, IWebHostEnvironment webHostEnvironment,
        ISolicitacoesService solicitacaoService, ITipoRetiradaService retiradaService, ITipoDocumentoService tipoDocumentoService, IDocumentosService documentoService,
         ITipoSolicitanteService solicitanteService, IStatusSolicitacaoService statusService, IMotivoSolicitacaoService motivoService, IMapper mapper)
        {
            _iCrudServiceSolicitacao = iCrudServiceSolicitacao;
            _solicitacaoService = solicitacaoService;
            _retiradaService = retiradaService;
            _solicitanteService = solicitanteService;
            _statusService = statusService;
            _motivoService = motivoService;
            _tipoDocumentoService = tipoDocumentoService;
            _documentoService = documentoService;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("save-solicitacao")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]

        public async Task<IActionResult> Insert([FromBody] ESolicitacao obj)
        {
            Response response = new Response();
            try
            {
                ETipoRetirada retirada = new ETipoRetirada();

                // retirada = obj.TipoRetirada;


                obj.TipoRetirada = _retiradaService.GetByID(obj.TipoRetirada.id);
                obj.TipoRequerente = _solicitanteService.GetByID(obj.TipoRequerente.id);
                obj.StatusSolicitacao = _statusService.GetById(obj.StatusSolicitacao.id);
                obj.TipoDocumento = _tipoDocumentoService.GetByID(obj.TipoDocumento.id);
                obj.MotivoSolicitacao = _motivoService.GetByID(obj.MotivoSolicitacao.id);

                var resp = _solicitacaoService.Save(obj);
                response.Data = resp;
                response.Success = true;
                return Ok(response);
            }
            catch (Exception e)
            {
                response.Error = e.Message;
                response.Success = false;
                return BadRequest(response);
            }
        }


        [HttpPost("update-solicitacao")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]

        public async Task<IActionResult> Update([FromBody] ESolicitacao obj)
        {
            Response response = new Response();
            try
            {
                ETipoRetirada retirada = new ETipoRetirada();

                // retirada = obj.TipoRetirada;


                obj.TipoRetirada = _retiradaService.GetByID(obj.TipoRetirada.id);
                obj.TipoRequerente = _solicitanteService.GetByID(obj.TipoRequerente.id);
                obj.StatusSolicitacao = _statusService.GetById(obj.StatusSolicitacao.id);
                obj.TipoDocumento = _tipoDocumentoService.GetByID(obj.TipoDocumento.id);
                obj.MotivoSolicitacao = _motivoService.GetByID(obj.MotivoSolicitacao.id);

                var resp = _solicitacaoService.UpdateSolicitacao(obj);
                response.Data = resp;
                response.Success = true;
                return Ok(response);
            }
            catch (Exception e)
            {
                response.Error = e.Message;
                response.Success = false;
                return BadRequest(response);
            }
        }

        [HttpGet("get-solicitacoes")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> getAll()
        {
            Response response = new Response();
            try
            {
                var resp = await _solicitacaoService.GetAll();
                var mapp = _mapper.Map<IEnumerable<DtoSolicitacao>>(resp);
                response.Data = mapp;
                response.Success = true;
                return Ok(response);
            }
            catch (Exception e)
            {

                response.Error = e.Message;
                response.Success = false;
                return BadRequest(response);
            }
        }

        [HttpGet("get-solicitacao-by-id/{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            Response response = new Response();
            try
            {
                EDocumentos updateD = _documentoService.GetByID(id);
                var diference = (DateTime.Now - updateD.created_at).TotalDays;

                if (diference > 5)
                {
                    response.Data = 5;
                    response.Success = true;
                    return Ok(response);
                }
                var resp = await _solicitacaoService.GetbyId(id);
                var mapp = _mapper.Map<IEnumerable<DtoSolicitacao>>(resp);
                response.Data = mapp;
                response.Success = true;
                return Ok(response);
            }
            catch (Exception e)
            {

                response.Error = e.Message;
                response.Success = false;
                return BadRequest(response);
            }
        }

        [HttpGet("image/{filename}", Name = "GetImage")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public ActionResult GetImage(string fileName)
        {
            Response response = new Response();
            try
            {
                string wwwRootPath = _webHostEnvironment.WebRootPath + @"/Docs/";
                // byte[] resp = System.IO.File.ReadAllBytes(wwwRootPath + fileName);                
                byte[] resp = System.IO.File.ReadAllBytes("Docs/" + fileName);

                var extension = Path.GetExtension(wwwRootPath + fileName);
                Console.WriteLine(extension);
                return File(resp, "Docs/" + extension.Replace(".", ""));

            }
            catch (Exception e)
            {
                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("save-documents", Name = "PostDocuments")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public object PostDocuments([FromForm] IFormFile files)
        {
            Response response = new Response();
            string wwwRootPath = _webHostEnvironment.WebRootPath + @"\Docs\";
            string tempFileName = System.Guid.NewGuid().ToString();
            tempFileName = tempFileName + files.FileName;
            List<IFormFile> docs = new List<IFormFile>();
            try
            {
                if (!System.IO.Directory.Exists(@"Docs\"))
                {
                    System.IO.Directory.CreateDirectory(@"Docs\");
                }

                // string pathString = System.IO.Path.Combine(@"Docs\", files.FileName);
                // if (!System.IO.Directory.Exists(wwwRootPath))
                // {
                //     System.IO.Directory.CreateDirectory(wwwRootPath);
                // }

                string pathString = System.IO.Path.Combine(wwwRootPath, files.FileName);
                var filePath = Path.GetTempFileName();
                FileStream filestream = System.IO.File.Create(pathString);
                files.CopyTo(filestream);
                filestream.Flush();
                filestream.Dispose();
                response.Success = true;

                response.Data = files;
                return Ok(response.Data);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("delete-event/{FileName}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> DeleteEvent([FromRoute] string FileName)
        {
            Response response = new Response();
            try
            {
                Console.WriteLine("eeeeeeeeeeeeeeeeeeeeeee");
                Console.WriteLine(FileName);
                string wwwRootPath = _webHostEnvironment.WebRootPath + @"\Docs\" + FileName;
                // byte[] resp = System.IO.File.ReadAllBytes(wwwRootPath + fileName);                
                System.IO.File.Delete(wwwRootPath);
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
