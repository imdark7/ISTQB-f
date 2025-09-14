namespace ISTQB_f.Models.Exam
{
    public class ExamViewModel
    {
        public Question[] questions { get; set; }
        public string language { get; set; }
        public bool isNativeLanguage { get; set; }
    }
}