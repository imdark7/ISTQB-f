namespace ISTQB_f.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Questions")]
    public class QuestionDbo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string EnglishText { get; set; }

        public string RussianText { get; set; }

        [StringLength(50)]
        public string Resource { get; set; }

        [StringLength(100)]
        public string Theme { get; set; }
    }
}
