namespace backend.Models.Response
{
    public class ClienteResponse
    {
 
        public int IdCliente { get; set; }
        public int IdLogin { get; set; }
        public string Nome { get; set; }
        public string Genero { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public string Celular{ get; set; }
        public string Foto { get; set; }
    }
}