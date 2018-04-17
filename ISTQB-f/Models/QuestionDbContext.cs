namespace ISTQB_f.Models
{
    using System.Data.Entity;

    public class QuestionDbContext : DbContext
    {
        public QuestionDbContext()
            : base("name=QuestionsData")
        {
        }

        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<QuestionDbo> Questions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<QuestionDbContext>(null);
            base.OnModelCreating(modelBuilder);
        }
    }
}
