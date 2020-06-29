using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;

namespace Stock.AppService.Services
{
    public class ProductTypeService: BaseService<ProductType>
    {                
        public ProductTypeService(IRepository<ProductType> repository) : base(repository)
        {
        }

        public new ProductType Create(ProductType entity)
        {
            if (this.NombreUnico(entity.Initials))
            {
                return base.Create(entity);
            }

            throw new System.Exception("The initials is already in use");
        }
        private bool NombreUnico(string initials)
        {
            if (string.IsNullOrWhiteSpace(initials))
            {
                return false;
            }

            return this.Repository.List(x => x.Initials.ToUpper().Equals(initials.ToUpper())).Count == 0;
        }

        // public IEnumerable<ProductType> Search(Expression<Func<ProductType,bool>> filter)
        // {
        //     return this.Repository.List(filter);
        // }
    }
}
