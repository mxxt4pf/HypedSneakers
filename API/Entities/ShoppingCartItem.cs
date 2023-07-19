using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    //annotations for migrations table name
    [Table("ShoppingCartItems")]
    public class ShoppingCartItem
    {
        public int Id {get; set;}
        public int purchasedQuantity {get; set;}

        //would show only item ID but not property
        public int ItemId{get; set;}
        public Product Product{get; set;}

        public int ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }

        
    }
}