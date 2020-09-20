using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;

namespace Stock.AppService.Services
{
    public class ProductTypeService: BaseService<ProductType>
    {                
        public ProductTypeService(IRepository<ProductType> repository)
            : base(repository)
        {

        }

        public new ProductType Create(ProductType entity)
        {
            if (this.NombreUnico(entity.Initials))
            {
                return base.Create(entity);
            }

            throw new System.Exception("The Initials is already in use");
        }
        private bool NombreUnico(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return false;
            }

            return this.Repository.List(x => x.Initials.ToUpper().Equals(name.ToUpper())).Count == 0;
        }

        
    }
}
