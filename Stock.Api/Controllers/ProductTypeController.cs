using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stock.Api.DTOs;
using Stock.AppService.Services;
using Stock.Model.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Stock.Api.Controllers
{
    /// <summary>
    /// Product type endpoint.
    /// </summary>
    [Produces("application/json")]
    [Route("api/producttype")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private readonly ProductTypeService service;
        private readonly IMapper mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="ProductTypeController"/> class.
        /// </summary>
        /// <param name="service">Product type service.</param>
        /// <param name="mapper">Mapper configurator.</param>
        public ProductTypeController(ProductTypeService service, IMapper mapper)
        {
            this.service = service ?? throw new ArgumentException(nameof(service));
            this.mapper = mapper ?? throw new ArgumentException(nameof(mapper));
        }

        /// <summary>
        /// Get all products.
        /// </summary>
        /// <returns>List of <see cref="ProductTypeDTO"/></returns>
        [HttpGet]
        public ActionResult<IEnumerable<ProductTypeDTO>> Get()
        {
            return Ok(mapper.Map<IEnumerable<ProductTypeDTO>>(service.GetAll()).ToList());
        }

        /// <summary>
        /// Gets a product by id.
        /// </summary>
        /// <param name="id">Product id to return.</param>
        /// <returns>A <see cref="ProductTypeDTO"/></returns>
        [HttpGet("{id}")]
        public ActionResult<ProductTypeDTO> Get(string id)
        {
            return Ok(mapper.Map<ProductTypeDTO>(service.Get(id)));
        }

        /// <summary>
        /// Add a product.
        /// </summary>
        /// <param name="value">Product information.</param>
        [HttpPost]
        public ActionResult Post([FromBody] ProductTypeDTO value)
        {
            TryValidateModel(value);
            
            try
            {
                var productType = this.mapper.Map<ProductType>(value);
                this.service.Create(productType);
                value.Id = productType.Id;
                return Ok(new { Success = true, Message = "", data = value });
            }
            catch
            {
                return Ok(new { Success = false, Message = "The name is already in use" });
            }
        }

        /// <summary>
        /// Updates a product.
        /// </summary>
        /// <param name="id">Product id to edit.</param>
        /// <param name="value">Product information.</param>
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] ProductTypeDTO value)
        {
            var productType = this.service.Get(id);
            TryValidateModel(value);
            mapper.Map<ProductTypeDTO, ProductType>(value, productType);
            service.Update(productType);
        }

        /// <summary>
        /// Deletes a product.
        /// </summary>
        /// <param name="id">Product id to delete.</param>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try {
                var productType = service.Get(id);

                Expression<Func<Product, bool>> filter = x => x.ProductType.Id.Equals(id);
                
                service.Delete(productType);
                return Ok(new { Success = true, Message = "", data = id });
            } catch {
                return Ok(new { Success = false, Message = "", data = id });
            }
        }
    }
}
