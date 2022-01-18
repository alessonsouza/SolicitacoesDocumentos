using System.Data;
using MySqlConnector;

namespace solicitacoesDocumentos.Interfaces
{
    public interface IConnectionFactory
    {
        MySqlConnection Connection();
    }
}