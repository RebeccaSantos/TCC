using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models.Response;

namespace api.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class ArquivoController : ControllerBase
    {
        Business.LivroBusiness business = new Business.LivroBusiness();
        Business.GerenciadorFile gerenciadorFile = new Business.GerenciadorFile();

        [HttpGet("listar/postes-livros/{posicao}")]
        public async Task<ActionResult<List<Models.Response.ArquivoResponse>>> ListarLogoController(int posicao)
        {
            try
            {
                List<Models.Response.ArquivoResponse> fotos = new List<Models.Response.ArquivoResponse>();
                List<Models.TbLivro> livros = await business.ListarLivroBusiness(posicao);

                foreach(Models.TbLivro item in livros)
                {
                    fotos.Add(new Models.Response.ArquivoResponse(item.IdLivro, item.NmLivro, item.DsCapa));
                }

                return fotos;
            }
            catch (System.Exception ex)
            {
                return NotFound( 
                    new ErroResponse(404, ex.Message)
                );
            }
        }

        [HttpGet]
        public async Task<ActionResult> ConsultarImagem(string nome)
        {
            try
            {

                byte[] arquivo = gerenciadorFile.LerFile(nome);
                string extensao = gerenciadorFile.GerarContentType(nome);
                
                return File(arquivo, extensao);
            }
            catch (System.Exception ex)
            {
                return NotFound( 
                    new ErroResponse(404, ex.Message)
                );
            }
        }

    }
}