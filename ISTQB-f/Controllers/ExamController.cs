using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ISTQB_f.Models;
using ISTQB_f.Models.Exam;

namespace ISTQB_f.Controllers
{
    public class ExamController : Controller
    {
        private readonly QuestionDbContext _db = new QuestionDbContext();

        public ActionResult Init()
        {
            return View();
        }

        public ActionResult Start(string language, bool isNative)
        {
            var questions = new List<Question>();
            var questionDbos = _db.Questions.OrderBy(q => Guid.NewGuid()).Take(40).ToList();
            foreach (var questionDbo in questionDbos)
            {
                var answers = _db.Answers.Where(a => a.questionId == questionDbo.Id).ToList();
                questions.Add(new Question(questionDbo, answers));
            }
            return View(new ExamViewModel
            {
                questions = questions,
                language = language,
                isNativeLanguage = isNative
            });
        }
    }
}
