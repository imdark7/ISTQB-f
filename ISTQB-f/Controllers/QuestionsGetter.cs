using ISTQB_f.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ISTQB_f.Controllers
{

    public static class QuestionsGetter
    {
        private readonly static Random random;
        public static List<Question> Questions { get; }
        public static Dictionary<int, int> QuestionIdToIndexMap { get; }

        static QuestionsGetter()
        {
            var questionsData = ParseData();
            Questions = questionsData;
            QuestionIdToIndexMap = questionsData.ToDictionary(x => x.id, Questions.IndexOf);
            random = new Random();
        }

        public static Question GetRandomQuestion() => Questions[GetRandomQuestionIndex()];

        public static Question[] GetRandomQuestions(int count)
        {
            var numbers = new HashSet<int>();
            while (numbers.Count < count)
            {
                numbers.Add(GetRandomQuestionIndex());
            }

            return numbers.Select(i => Questions[i]).ToArray();
        }

        public static Question GoToQuestion(int id)
        {
            var index = 0;
            if (QuestionIdToIndexMap.ContainsKey(id))
            {
                index = QuestionIdToIndexMap[id];
            }

            return Questions[index];
        }

        public static Question GetNextQuestion(int id, bool isRandomStrategy)
        {
            if (isRandomStrategy)
            {
                return GetRandomQuestion();
            }
            else
            {
                var currentIndex = QuestionIdToIndexMap[id];
                var nextIndex = currentIndex + 1 >= Questions.Count
                    ? 0
                    : currentIndex + 1;
                return Questions[nextIndex];
            }
        }

        private static int GetRandomQuestionIndex() => random.Next(0, Questions.Count - 1);

        private static List<Question> ParseData()
        {
            var content = File.ReadAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Controllers", "data.json"));
            return JsonConvert.DeserializeObject<List<Question>>(content);
        }
    }
}