using ISTQB_f.Models;
using System.Text;
using System.Web.Mvc;

namespace ISTQB_f.Controllers
{
    public class TrainingController : Controller
    {
        /// <summary>
        /// Переход на /Training
        /// </summary>
        /// <param name="strategy"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult NextQuestion(string strategy, int? id = null)
        {
            return View(GetNextQuestion(id, strategy));
        }

        /// <summary>
        /// Переход к следующему вопросу
        /// </summary>
        /// <param name="id"></param>
        /// <param name="strategy"></param>
        /// <returns></returns>
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

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

        private Question GetNextQuestion(int? id, string strategy)
        {
            var qId = id ?? 1;
            if (strategy == null)
            {
                return QuestionsGetter.GoToQuestion(qId);
            }

            return QuestionsGetter.GetNextQuestion(qId, strategy == "random");
        }
    }
}