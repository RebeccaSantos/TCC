using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class LivroController : ControllerBase
    {
        Utils.Conversor.LivroConversor ConversorLivro = new Utils.Conversor.LivroConversor();
        Utils.Conversor.FavoritoConversor conversor = new Utils.Conversor.FavoritoConversor();
        Business.LivroBusiness business = new Business.LivroBusiness();
        Business.GerenciadorFile gerenciadorFoto = new Business.GerenciadorFile();
        
        [HttpPost]
        public async Task<ActionResult<Models.Response.LivroResponse>> Inserir([FromForm] Models.Request.LivroRequest request)
        {
            try
            {
                Models.TbLivro livro = ConversorLivro.Conversor(request);
                livro.DsCapa = gerenciadorFoto.GerarNovoNome(request.foto.FileName);
                Models.TbLivro result = await business.InserirBusinesa(livro);
                gerenciadorFoto.SalvarFile(livro.DsCapa, request.foto);
                Models.Response.LivroResponse response = ConversorLivro.Conversor(result);

                return response;
            }
            catch(System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        }

        [HttpGet("{idlivro}/{idcliente}")]
        public async Task<ActionResult<Models.Response.LivroCompleto>> ConsultarLivroId (int idlivro, int idcliente)
        {
            try
            {
                Models.TbLivro livro = await business.ConsultarLivroIdBusiness(idlivro);
                Models.Response.LivroCompleto response= ConversorLivro.ConversorCompleto(livro);
                
                if(livro.TbFavoritos.Count != 0 && livro.TbFavoritos.All(x =>x.IdCliente == idcliente))
                {
                    response.livro.favorito = true;
                    Models.TbFavoritos a = livro.TbFavoritos.FirstOrDefault( x => x.IdCliente == idcliente && x.IdLivro == idlivro);
                    response.favorito = conversor.ConversorResponse(a);
                }
                else
                {
                    response.livro.favorito = false;
                }

                return response;
            }
            catch (System.Exception ex)
            {
                return NotFound(
                    new Models.Response.ErroResponse(404, ex.Message)
                );
            }
        }


        /*[HttpGet("listar/{atual}")]
        public async Task<ActionResult<List<Models.Response.LivroCompleto>>> ListarLivro (int inicio = 0, int fim = 10)
        {
            try
            {
                List<Models.TbLivro> livro = await business.ListarLivroBusiness(inicio, fim);
                return livro.Select(x => ConversorLivro.ConversorCompleto(x)).ToList();
            }
            catch (System.Exception ex)
            {
                return NotFound(
                    new Models.Response.ErroResponse(404, ex.Message)
                );
            }
        }*/

        [HttpPut("{idlivro}")]
        public async Task<ActionResult<Models.Response.LivroResponse>> Alterar(int idlivro, [FromForm] Models.Request.LivroRequest request)
        {
            try
            {
                Models.TbLivro livro = ConversorLivro.Conversor(request);
                livro.DsCapa = gerenciadorFoto.GerarNovoNome(request.foto.FileName);
                Models.TbLivro result = await business.AlterarBusiness(idlivro, livro);
                gerenciadorFoto.SalvarFile(livro.DsCapa, request.foto);
                Models.Response.LivroResponse response = ConversorLivro.Conversor(result);

                return response;
            }
            catch(System.Exception ex)
            {
                return BadRequest(
                    new Models.Response.ErroResponse(400, ex.Message)
                );
            }
        }
    }
}