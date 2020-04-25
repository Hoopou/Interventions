using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Interventions.Data.Entities
{
    public class TypeProbleme
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string descriptionTypeProbleme { get; set; }
    }
}
