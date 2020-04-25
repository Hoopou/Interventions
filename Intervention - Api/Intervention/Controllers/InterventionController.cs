using Interventions.Data;
using Interventions.Data.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Interventions.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("AllowAllOrigins")]
    [ApiController]
    public class InterventionController : Controller
    {
        private readonly IInterventionsRepository _repository;
        private readonly ILogger<InterventionsRepository> _logger;

        public InterventionController(IInterventionsRepository repository, ILogger<InterventionsRepository> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.ObtenirCategoriesProbleme());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur pour obtenir les catégories de prdouit {ex}");
                return BadRequest("Erreur pour obtenir les catégories de produits dans le get des interventions");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]DeclarerProbleme model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _repository.AddEntity(model);
                    if (_repository.Save())
                    {
                        return Created($"/api/Intervention/{model.Id}", model);
                    }
                }
                else
                {
                    return BadRequest($"Erreur dans le model {ModelState}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur pour l'ajout d'un nouveau produit {ex}");
                return BadRequest("Erreur pour l'ajout d'un nouveau produit");
            }
            return BadRequest("Erreur pour l'ajout d'un nouveau produit");
        }
    }
}