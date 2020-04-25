using Interventions.Data.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Interventions.Data
{
    public class InterventionsRepository : IInterventionsRepository
    {
        private readonly InterventionsContext _ctx;
        private readonly ILogger<InterventionsContext> _logger;

        public InterventionsRepository(InterventionsContext ctx, ILogger<InterventionsContext> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public void AddEntity(object model)
        {
            try
            {
                _ctx.Add(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur dans l'ajout dans la collection {ex}");
            }
        }

        public IEnumerable<TypeProbleme> ObtenirCategoriesProbleme()
        {
            try
            {
                //return _ctx.Probleme.ToList();
                //return _ctx.Probleme.ToList();
                return _ctx.CategoriesProbleme.OrderBy(e => e.Id).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur pour récupérer les catgéories de produit dans la bd {ex}");
                return null;
            }
        }

        public bool Save()
        {
            try
            {
                return _ctx.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur dans la sauvegarde {ex}");
                return false;
            }
        }
    }

}
