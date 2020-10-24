using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarrinhoController:ControllerBase
    {
        Utils.Conversor.CarrinhoConversor conversor = new Utils.Conversor.CarrinhoConversor();
        Business.CarrinhoBusiness business = new Business.CarrinhoBusiness();
        [HttpPost("cadastrar")]
        public async Task<ActionResult<Models.Response.CarrinhoResponse>> CadastrarCarrinho(Models.Request.CarrinhoRequest request)
        {
            try
            {
                Models.TbCarrinho tabela = conversor.ConversorTabela(request);
                tabela = await business.ValidarInserirCarrinho(tabela); 
                return conversor.ConversorResponse(tabela);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new Models.Response.ErroResponse(404,ex.Message));
            }
        }

        [HttpPut("alterar/{idcarrinho}")]
        public async Task<ActionResult<Models.Response.CarrinhoResponse>> AlterarCarrinho(int idcarrinho,Models.Request.CarrinhoRequest request)
        {
            try
            {
                Models.TbCarrinho tabela = conversor.ConversorTabela(request);
                tabela = await business.ValidarAlteracaoCarrinho(idcarrinho,tabela);
                return conversor.ConversorResponse(tabela);
            }
            catch (System.Exception ex)
            {
                return new NotFoundObjectResult(new Models.Response.ErroResponse(404,ex.Message));
            }
        }
    }
}