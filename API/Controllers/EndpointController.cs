using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers
{
    public class EndpointController : RootApiController
    {
        /*added unique route for each HttpGet for every specific error function 
        as the controller cannot guess it on its own*/
        [HttpGet("nothing-found")]
        public ActionResult GetNothing() {
            return NotFound(); //if nothing found like no errors basically a 404 status
        }

         [HttpGet("unauthenticated")]
        public ActionResult GetUnauthorizedError() {
            return Unauthorized(); //if user is not authorized/authenticated would sent a 401 error
        }

        [HttpGet("validation-type-error")]
        public ActionResult GetValidationTypeError() {  
            /*for adding erros manually to the page*/
            ModelState.AddModelError("Issue#one", "error ocurred!");
            return ValidationProblem();//error occuring while not typing in required fields
            
        }

         [HttpGet("ocurrence-of-badrequest")]
        public ActionResult GetBadRequest() {
            return BadRequest("Bad Request occured!"); //if bad request occurs
        }
        
         [HttpGet("server-type")]
         //exception handling 
         public ActionResult GetErrorTypeServer() {
            throw new Exception("Error message for network server type error! ");
         }

  


        
    }
}