using Microsoft.EntityFrameworkCore;
using Interventions.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Interventions.Data
{
    public class InterventionsContext: DbContext
    {
        public InterventionsContext(DbContextOptions<InterventionsContext> options): base(options)
        {

        }

        public DbSet<DeclarerProbleme> Probleme { get; set; }
        public DbSet<TypeProbleme> CategoriesProbleme { get; set; }
    }
    
}
