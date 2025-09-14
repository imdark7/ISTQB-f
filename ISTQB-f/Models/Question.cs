using System.Collections.Generic;

namespace ISTQB_f.Models
{
    public class Question
    {
        public int id { get; set; }
        public string englishText { get; set; }
        public string russianText { get; set; }
        public string resource { get; set; }
        public string theme { get; set; }
        public List<Answer> answers { get; set; }

        public Question()
        {
        }
    }
}