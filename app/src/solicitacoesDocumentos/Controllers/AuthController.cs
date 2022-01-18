using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Services.Security;
using solicitacoesDocumentos.Models;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _itokenService;

        private readonly IAuthenticationRepository _authRepository;

        public AuthController(ITokenService itokenService, IAuthenticationRepository authRepository)
        {
            _itokenService = itokenService;
            _authRepository = authRepository;
        }

        [HttpPost("/auth")]

        public IActionResult Authenticate([FromBody] AuthModel auth)
        {
            Response response = new Response();
            ResponseLogin responseLogin = new ResponseLogin();
            try
            {
                int status = 200;
                EUser user = _authRepository.GetUsuario(auth);

                User obj = new User
                {
                    id = user.id,
                    name = user.name,
                    login = user.login,
                    status = user.status,
                    perfils = user.perfils,
                    created_at = user.created_at

                };
                string token = _itokenService.GenerateToken(user);
                responseLogin.Token = token;
                responseLogin.User = obj;
                response.Data = responseLogin;
                response.Success = true;
                return Ok(response);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [HttpGet("/check")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Response))]
        public IActionResult Check()
        {
            Response response = new Response();
            response.Data = "Ok";
            return Ok(response);
        }
    }
}