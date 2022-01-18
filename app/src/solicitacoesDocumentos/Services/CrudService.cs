using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using solicitacoesDocumentos.Interfaces.Repository;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models.Entity;

namespace solicitacoesDocumentos.Services
{
    public class CrudService<TEntity> : ICrudService<TEntity> where TEntity : EBase
    {
        protected readonly IGenericRepository<TEntity> _repository;
        private ISolicitacoesRepository solicitacoesoRepository;

        public CrudService(IGenericRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public CrudService(ISolicitacoesRepository solicitacoesoRepository)
        {
            this.solicitacoesoRepository = solicitacoesoRepository;
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                return await _repository.Delete(id);
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }

        }

        public async Task<TEntity> Insert(TEntity item)
        {
            try
            {
                return await _repository.Insert(item);
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }

        public async Task<TEntity> Select(int id)
        {
            try
            {
                return await _repository.Select(id);
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }

        public async Task<IEnumerable<TEntity>> Select()
        {
            try
            {
                return await _repository.Select();
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }

        public async Task<TEntity> Update(TEntity item, int id)
        {
            try
            {
                return await _repository.Update(item, id);
            }
            catch (Exception e)
            {
                throw new ApplicationException(e.Message);
            }
        }
    }
}