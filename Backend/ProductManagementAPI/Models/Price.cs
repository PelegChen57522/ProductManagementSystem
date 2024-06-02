namespace ProductManagementAPI.Models
{
    public class Price
    {
        public int PriceId { get; set; }
        public string Amount { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
    }
}
