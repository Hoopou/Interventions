using Interventions.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Interventions.Data
{
    public interface IInterventionsRepository
    {
        IEnumerable<TypeProbleme> ObtenirCategoriesProbleme();
        void AddEntity(object model);
        bool Save();
    }
}
