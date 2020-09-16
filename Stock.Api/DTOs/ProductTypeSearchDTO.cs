using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class ProductTypeSearchDTO
    {

        [Required]
        public string Initials { get; set; }

        [Required]
        public string Description { get; set; }
        
        
        public ActionDto Condition { get; set; } 

    }
}
