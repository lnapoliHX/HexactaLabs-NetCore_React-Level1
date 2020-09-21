using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stock.Api.DTOs;
using Stock.Api.Extensions;
using Stock.AppService.Services;
using Stock.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Stock.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/producttype")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private readonly ProductTypeService service;
        private readonly IMapper mapper;
        
        public ProductTypeController(ProductTypeService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        /// <summary>
        /// Permite recuperar todas las instancias
        /// </summary>
        /// <returns>Una colección de instancias</returns>
        [HttpGet]
        public ActionResult<IEnumerable<ProductTypeDTO>> Get()
        {
            return this.mapper.Map<IEnumerable<ProductTypeDTO>>(this.service.GetAll()).ToList();
        }

        /// <summary>
        /// Permite recuperar una instancia mediante un identificador
        /// </summary>
        /// <param name="id">Identificador de la instancia a recuperar</param>
        /// <returns>Una instancia</returns>
        [HttpGet("{id}")]
        public ActionResult<ProductTypeDTO> Get(string id)
        {
            return this.mapper.Map<ProductTypeDTO>(this.service.Get(id));
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="value">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] ProductTypeDTO value)
        {
            
            if (TryValidateModel(value))
            {
                var productType = this.mapper.Map<ProductType>(value);
                this.service.Create(productType);
                value.Id = productType.Id;
                return Ok(new { Success = true, Message = "", data = value });
            }
            else {
                return Ok(new { Success = false, Message = "Missing Validations"});
            }
        }

        /// <summary>
        /// Permite editar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a editar</param>
        /// <param name="value">Una instancia con los nuevos datos</param>
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] ProductTypeDTO value)
        {
            if (TryValidateModel(value)) 
            {
                var productType = this.service.Get(id);
                this.mapper.Map<ProductTypeDTO, ProductType>(value, productType);
                this.service.Update(productType);
                return Ok(new { Success = true, Message = "", data = value });
            } 
            else 
            {
                return BadRequest("Missing Validations");
            }            
        }

        /// <summary>
        /// Permite borrar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a borrar</param>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var productType = this.service.Get(id);

             Expression<Func<Product, bool>> filter = x => x.ProductType.Id.Equals(id);
            
            this.service.Delete(productType);
            return Ok();
        }

        /// <summary>
        /// Permite encontrar una o mas instancias que coincidan con los campos de busqueda
        /// </summary>
        /// <param name="model">Campos de busqueda</param>
        [HttpPost("search")]
        public ActionResult Search([FromBody] ProductTypeSearchDTO model)
        {
            Expression<Func<ProductType, bool>> filter = x => !string.IsNullOrWhiteSpace(x.Id);

            if (!string.IsNullOrWhiteSpace(model.Initials))
            {
                filter = filter.AndOrCustom(
                    x => x.Initials.ToUpper().Contains(model.Initials.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            if (!string.IsNullOrWhiteSpace(model.Description))
            {
                filter = filter.AndOrCustom(
                    x => x.Description.ToUpper().Contains(model.Description.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            var productTypes = this.service.Search(filter);
            return Ok(productTypes);
        }
    }
}
