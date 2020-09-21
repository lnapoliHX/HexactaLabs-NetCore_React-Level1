using System.ComponentModel.DataAnnotations;

namespace Stock.Api.DTOs
{
    public class StoreDTO
    {
        [Required]
        public string Name { get; set; }

        public string Id { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Address { get; set; }

    }
}