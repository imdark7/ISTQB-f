using ISTQB_f.Models.Exam;
using System.Web.Mvc;

namespace ISTQB_f.Controllers
{
    public class ExamController : Controller
    {
        public ActionResult Init()
        {
            return View();
        }

        public ActionResult Start(string language, bool isNative)
        {
            var questions = QuestionsGetter.GetRandomQuestions(40);
            return View(new ExamViewModel
            {
                questions = questions,
                language = language,
                isNativeLanguage = isNative
            });
        }
    }
}
