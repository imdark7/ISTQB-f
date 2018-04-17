namespace ISTQB_f.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class Answer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        public int questionId { get; set; }

        public string englishText { get; set; }

        public string russianText { get; set; }

        public bool isCorrect { get; set; }
    }
}
