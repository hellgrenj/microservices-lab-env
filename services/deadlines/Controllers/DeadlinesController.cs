using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace deadlines.Controllers
{
    [ApiController]
    public class DeadlinesController : ControllerBase
    {
        private readonly ILogger<DeadlinesController> _logger;
        public DeadlinesController(ILogger<DeadlinesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("deadlines/numberofmissed")]
        public ActionResult NumberOfMissed()
        {
            var random = new Random();
            var listOfRandomValues = new List<string> { "a lot of", "two", "three", "four" };
            int index = random.Next(listOfRandomValues.Count);
            return Ok($"You have missed {listOfRandomValues[index]} deadlines this week");
        }
    }
}
