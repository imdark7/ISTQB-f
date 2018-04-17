using System.Collections.Generic;

namespace ISTQB_f.Models.Exam
{
    public class ExamViewModel
    {
        public List<Question> questions { get; set; }
        public string language { get; set; }
        public bool isNativeLanguage { get; set; }
    }
}