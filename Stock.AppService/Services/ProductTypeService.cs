using System.Collections.Generic;
using System.Linq.Expressions;
using Stock.Model.Entities;
using Stock.AppService.Base;
using Stock.Repository.LiteDb.Interface;
using System;

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
            if (this.InicialesUnico(entity.Initials))
            {
                return base.Create(entity);
            }

            throw new System.Exception("The initials are already in use");
        }
        private bool InicialesUnico(string initials)
        {
            if (string.IsNullOrWhiteSpace(initials))
            {
                return false;
            }

            return this.Repository.List(x => x.Initials.ToUpper().Equals(initials.ToUpper())).Count == 0;
        }

        public IEnumerable<ProductType> Search(Expression<Func<ProductType,bool>> filter)
        {
            return this.Repository.List(filter);
        }
    }
}
