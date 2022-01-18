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
    [Route("/users")]
    public class UsuarioController : ControllerBase
    {
        private readonly ICrudService<EUser> _iCrudServiceUsuario;
        private readonly IUserService _usuarioService;

        public UsuarioController(ICrudService<EUser> iCrudServiceUsuario, IUserService usuarioService)
        {
            _iCrudServiceUsuario = iCrudServiceUsuario;
            _usuarioService = usuarioService;
        }

        [HttpPost("group")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> ListUsersGroup([FromBody] Group grupo)
        {
            var email = User.Claims.FirstOrDefault(x => x.Type == "mail")?.Value;

            var user = _usuarioService.GetUsuarioByEmail(email);
            var data = _usuarioService.GetUserByGroups(user, grupo.chave);

            Response response = new Response();
            response.Data = data;

            return Ok(response);
        }

        [HttpPost("perfils/{chave}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> ListMyGroup(string chave)
        {
            var email = User.Claims.FirstOrDefault(x => x.Type == "mail")?.Value;

            var user = _usuarioService.GetPerfilByChave(email, chave);

            Response response = new Response();
            response.Data = user;

            return Ok(response);
        }

        [HttpPost("new-user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> NewUser([FromBody] EUser usuario)
        {
            var Perfis = await _usuarioService.GetPerfilByChave(usuario.email, usuario.perfils[0].chave);
            usuario.perfils = (System.Collections.Generic.List<EPerfil>)Perfis;
            var user = await _usuarioService.NewUser(usuario);


            Response response = new Response();
            try
            {
                response.Data = user;
                response.Success = true;
                return Ok(response);

            }
            catch (Exception e)
            {


                response.Success = true;
                response.Error = e.Message;
                return BadRequest(response);
            }


        }

        [HttpPut("update-user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public async Task<IActionResult> UpdateUser([FromBody] EUser usuario)
        {
            var email = User.Claims.FirstOrDefault(x => x.Type == "mail")?.Value;
            var user = _iCrudServiceUsuario.Update(usuario, usuario.id);

            Response response = new Response();
            response.Data = user;

            return Ok(response);
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
                var user = _usuarioService.GetById(email, id);

                User obj = new User
                {
                    id = user.id,
                    name = user.name,
                    email = user.email,
                    login = user.login,
                    status = user.status,
                    perfils = user.perfils,
                    created_at = user.created_at

                };
                response.Data = obj;
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


        [HttpGet("get-perfis", Name = "GetPerfis")]
        // [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public async Task<IActionResult> GetPerfis()
        {
            Response response = new Response();
            // var email = User.Claims.FirstOrDefault(x => x.Type == "mail")?.Value;
            try
            {
                var perfis = _usuarioService.GetAllPerfil();


                response.Data = perfis.Result;
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