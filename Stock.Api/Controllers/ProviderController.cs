using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stock.Api.DTOs;
using Stock.Api.Extensions;
using Stock.AppService.Services;
using Stock.Model.Entities;

namespace Stock.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        private ProviderService service;
        private readonly IMapper mapper;

        public ProviderController(ProviderService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        /// <summary>
        /// Permite recuperar todas las instancias
        /// </summary>
        /// <returns>Una colección de instancias</returns>
        [HttpGet]
        public ActionResult<IEnumerable<ProviderDTO>> Get()
        {
            try
            {
                var result = this.service.GetAll();
                return this.mapper.Map<IEnumerable<ProviderDTO>>(result).ToList();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Permite recuperar una instancia mediante un identificador
        /// </summary>
        /// <param name="id">Identificador de la instancia a recuperar</param>
        /// <returns>Una instancia</returns>
        [HttpGet("{id}")]
        public ActionResult<ProviderDTO> Get(string id)
        {
            try
            {
                var result = this.service.Get(id);
                return this.mapper.Map<ProviderDTO>(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="value">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] ProviderDTO value)
        {
            if (TryValidateModel(value))
            {
                try
                {
                    var provider = this.mapper.Map<Provider>(value);
                    this.service.Create(provider);
                    value.Id = provider.Id;
                    return Ok(new { Success = true, Message = "", data = value });
                }
                catch
                {
                    return Ok(new { Success = false, Message = "Ups! Something Happened, Sorry" });
                }
            }
            else {
                return BadRequest("Missing Validations");
            }
        }

        /// <summary>
        /// Permite editar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a editar</param>
        /// <param name="value">Una instancia con los nuevos datos</param>
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] ProviderDTO value)
        {
            if (TryValidateModel(value))
            {
                var provider = this.service.Get(id);
                this.mapper.Map<ProviderDTO, Provider>(value, provider);
                this.service.Update(provider);
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
            var store = this.service.Get(id);
            
            this.service.Delete(store);
            return Ok(new { Success = true, Message = "Delete Complete", data = id });
        }

        /// <summary>
        /// Permite encontrar una o mas instancias que coincidan con los campos de busqueda
        /// </summary>
        /// <param name="model">Campos de busqueda</param>
        [HttpPost("search")]
        public ActionResult Search([FromBody] ProviderSearchDTO model)
        {
            Expression<Func<Provider, bool>> filter = x => !string.IsNullOrWhiteSpace(x.Id);

            if (!string.IsNullOrWhiteSpace(model.Name))
            {
                filter = filter.AndOrCustom(
                    x => x.Name.ToUpper().Contains(model.Name.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            if (!string.IsNullOrWhiteSpace(model.Email))
            {
                filter = filter.AndOrCustom(
                    x => x.Email.ToUpper().Contains(model.Email.ToUpper()),
                    model.Condition.Equals(ActionDto.AND));
            }

            var providers = this.service.Search(filter);
            return Ok(providers);
        }
    }
}
