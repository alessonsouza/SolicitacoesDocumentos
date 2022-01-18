using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Interfaces.Repository
{
    public interface IGenericRepository<TEntity> where TEntity : EBase
    {
        Task<TEntity> Insert(TEntity item);
        Task<TEntity> Update(TEntity item, int id);
        Task<bool> Delete(int id);
        Task<TEntity> Select(int id);
        Task<IEnumerable<TEntity>> Select();
        Task<bool> Exist(int id);
    }
}
