using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using ISTQB_f.Models;

namespace ISTQB_f.Controllers
{
    public class TrainingController : Controller
    {
        private readonly QuestionDbContext _db = new QuestionDbContext();

        [HttpGet]
        public ActionResult NextQuestion(string strategy, int? id = null)
        {
            return View(GetNextQuestion(id, strategy));
        }

        [HttpGet]
        public JsonResult Next(int? id, string strategy)
        {
            return new JsonResult
            {
                Data = GetNextQuestion(id, strategy),
                ContentEncoding = Encoding.UTF8,
                ContentType = "application/json",
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public ActionResult EditTranslate(int? id)
        {
            if (id == null)
            {
                return new EmptyResult();
            }
            return View(GetNextQuestion(id, null));
        }

        [HttpPost]
        public JsonResult SetTranlation(Question questionModel, string strategy)
        {
            var question = _db.Questions.SingleOrDefault(q => q.Id == questionModel.id);
            if (question != null)
            {
                question.EnglishText = questionModel.englishText.Replace("\n", "\r\n");
                question.RussianText = questionModel.russianText.Replace("\n", "\r\n");
            }
            var answers = new List<Answer>();
            foreach (var a in questionModel.answers)
            {
                var answer = _db.Answers.SingleOrDefault(x => x.id == a.id);
                if (answer != null)
                {
                    answer.englishText = a.englishText;
                    answer.russianText = a.russianText;
                }
                answers.Add(answer);
            }
            _db.SaveChanges();

            return new JsonResult
            {
                Data = GetNextQuestion(questionModel.id, strategy),
                ContentEncoding = Encoding.UTF8,
                ContentType = "application/json",
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }

        [HttpGet]
        public ActionResult NextQuestions(int? id, bool isRandomStrategy)
        {
            if (isRandomStrategy)
            {
                return RedirectToAction("NextQuestion");
            }
            else
            {
                var nextQuestions = _db.Questions.Where(q => q.Id > id);
                var nextId = !nextQuestions.Any() ? 1 : nextQuestions.Min(s => s.Id);
                return RedirectToAction("NextQuestion", new { id = nextId });
            }
        }

        [HttpGet]
        public ActionResult RandomQuestion(string language)
        {
            return RedirectToAction("NextQuestion", new { language });
        }

        [HttpGet]
        public ActionResult NextInlineQuestion(string language, int id)
        {
            return RedirectToAction("NextQuestion", new { language, strategy = "inline", id });
        }

        public ActionResult Question(string language, int id)
        {
            return RedirectToAction("NextQuestion", new { language, id });
        }

        private Question GetNextQuestion(int? id, string strategy)
        {
            QuestionDbo qdbo;
            if (id == null || strategy == "random")
            {
                qdbo = _db.Questions.OrderBy(q => Guid.NewGuid()).First();
            }
            else
            {
                if (strategy == "inline")
                {
                    qdbo = _db.Questions.FirstOrDefault(q => q.Id > id) ?? _db.Questions.First();
                }
                else
                {
                    qdbo = _db.Questions.SingleOrDefault(q => q.Id == id) ?? _db.Questions.First();
                }
            }
            var answers = _db.Answers.Where(a => a.questionId == qdbo.Id).ToList();
            return new Question(qdbo, answers);
        }
    }
}