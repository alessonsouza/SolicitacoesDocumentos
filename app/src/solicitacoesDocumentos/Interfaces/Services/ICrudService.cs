
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Service
{
    public interface ICrudService<T> where T : EBase
    {
        Task<T> Insert(T item);
        Task<T> Update(T item, int id);
        Task<bool> Delete(int id);
        Task<T> Select(int id);
        Task<IEnumerable<T>> Select();

    }
}