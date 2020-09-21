﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.Extensions.Options;
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
        public IEnumerable<ProductType> Search(Expression<Func<ProductType,bool>> filter)
        {
            return this.Repository.List(filter);
        }
    }
}
