using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stock.Api.DTOs
{
    public class ProductTypeSearchDTO
    {

        public string initials { get; set; }
        public string description { get; set; }
        public ActionDto Condition { get; set; } = ActionDto.AND;
    }
}
