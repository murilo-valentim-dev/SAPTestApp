using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAPTestApi.Entities
{
    [Table("OITM")]
    public class Item
    {
        [Key]
        [MaxLength(20)] 
        public string ItemCode { get; set; } = string.Empty;

        [MaxLength(100)] 
        public string ItemName { get; set; } = string.Empty;

        public int Quantity { get; set; }
    }
}
