using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAPTestApi.Entities
{
    [Table("OCRD")]
    public class Partner
    {
        [Key]
        [MaxLength(15)]
        public string CardCode { get; set; } = string.Empty;

        [MaxLength(100)]
        public string CardName { get; set; } = string.Empty;
        public char CardType { get; set; } // 'C' ou 'F'
    }
}
