using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BilHallen.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace BilHallen.Controllers
{
    [Route("api/cars")]
    public class CarsController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private DatabaseContext databaseContext;

        public CarsController(DatabaseContext databaseContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.databaseContext = databaseContext;
            databaseContext.Database.EnsureCreated();
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet, Route("GetUsers")]
        async public Task<IActionResult> GetUsers()
        {
            User user1 = new User();
            User user2 = new User();
            User user3 = new User();

            foreach (var userDelete in userManager.Users.ToList())
            {
                await userManager.DeleteAsync(userDelete);
            }

            user1.Email = "adrian@gmail.com";
            user1.UserName = "Adrian";

            var result1 = await userManager.CreateAsync(user1);

            await userManager.AddClaimAsync(user1, new Claim("CarsAppRole", "Administrator"));
            await userManager.AddClaimAsync(user1, new Claim("CarsAppRole", "Cardealer"));
            await userManager.AddClaimAsync(user1, new Claim("CarsAppRole", "Anonymous"));

            user2.Email = "marc@gmail.com";
            user2.UserName = "Marc";

            var result2 = await userManager.CreateAsync(user1);

            await userManager.AddClaimAsync(user1, new Claim("CarsAppRole", "Cardealer"));
            await userManager.AddClaimAsync(user1, new Claim("CarsAppRole", "Anonymous"));

            user3.Email = "oscar@gmail.com";
            user3.UserName = "Oscar";

            var result3 = await userManager.CreateAsync(user1);

            await userManager.AddClaimAsync(user1, new Claim("CarsAppRole", "Anonymous"));

            return Ok();
        }

        [HttpGet, Route("GetEmails")]
        public IActionResult GetEmails()
        {
            var list = userManager.Users.ToList();
            return Ok(list);
        }

        [HttpGet, Route("GetCars")]
        public IActionResult GetCars()
        {
            var list = databaseContext.Cars.ToList();
            return Ok(list);
        }

        [HttpGet, Route("GetCar/{id}")]
        public IActionResult GetCar(int id)
        {
            var car = databaseContext.Cars.First(c => c.Id == id);
            return Ok(car);
        }
        //[Authorize(Policy ="CardealerRights")]
        [HttpPost, Route("AddCar")]
        public IActionResult AddCar([FromBody]Car obj)
        {
            databaseContext.Add(obj);
            databaseContext.SaveChanges();

            return Ok();
        }
        //[Authorize(Policy ="AdministratorRights")]
        [HttpDelete, Route("DeleteCar/{id}")]
        public IActionResult DeleteCar(int id)
        {
            var car = databaseContext.Cars.First(c => c.Id == id);

            databaseContext.Remove(car);
            databaseContext.SaveChanges();
            return Ok();
        }
        //[Authorize(Policy = "CardealerRights")]
        [HttpPut, Route("EditCar")]
        public IActionResult EditCar([FromBody]Car obj)
        {
            databaseContext.Update(obj);
            databaseContext.SaveChanges();
            return new ObjectResult("Car updated successfully!");
        }


    }
}