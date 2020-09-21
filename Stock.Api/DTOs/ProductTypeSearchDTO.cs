namespace Stock.Api.DTOs
{
    public class ProductTypeSearchDTO
    {
        public string Description { get; set; }

        public string Initials { get; set; }

        public ActionDto Condition { get; set; } 
    }
}