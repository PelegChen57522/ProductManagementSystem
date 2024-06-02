namespace ProductManagementAPI.Models
{
    public class Size
    {
        public int SizeId { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int Weight { get; set; }
        public string Measurement { get; set; } = string.Empty;
    }
}
