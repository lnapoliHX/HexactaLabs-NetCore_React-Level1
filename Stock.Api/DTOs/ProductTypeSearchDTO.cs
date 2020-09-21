using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stock.Api.DTOs
{
    public class ProductTypeSearchDTO
    {
        public string Initials { get; set; }

        public string Description { get; set; }

        public ActionDto Condition { get; set; }
    }
}
