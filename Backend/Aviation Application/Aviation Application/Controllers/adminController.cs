using Aviation_Application.DTO;
using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class adminController : ControllerBase
    {
        private readonly AviationContext context;

        public adminController(AviationContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAllAdmis")]
        public ActionResult GetAllAdmins()
        {
            var allAdmins=context.Admins.ToList();
            return Ok(allAdmins);
        }
        [HttpPost("AddAdmins")]
        public ActionResult AddAdmins(AdminDTO adminDTO) {
            var newadmins = new Admin
            {
                UserName=adminDTO.UserName,
                Email=adminDTO.Email,
                Password=adminDTO.Password,
            };
            context.Admins.Add(newadmins);
            context.SaveChanges();
            return Ok(newadmins);
        }

        [HttpPut("EditAdmins/{id}")]
        public ActionResult EditAdmins(int id,AdminDTO adminDTO) {
            var adminId = context.Admins.Find(id);
            adminId.UserName=adminDTO.UserName;
            adminId.Email=adminDTO.Email;
            adminId.Password=adminDTO.Password;
            context.SaveChanges();
            return Ok(adminId);
        }
        [HttpDelete("DeleteAdmin")]
        public ActionResult DeleteAdmins(int id)
        {
            var adminId = context.Admins.Find(id);
            context.Admins.Remove(adminId);
            context.SaveChanges();
            return Ok(adminId);
        }




        [HttpPost("Login")]
        public ActionResult Login([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO == null)
                return BadRequest("Login data is null");
            var user = context.Admins.FirstOrDefault(x => x.Email == loginDTO.Email && x.Password == loginDTO.Password);
            if (user == null)
            {
                return BadRequest("Invalid credentials");
            }
            return Ok(user);
        }
    }
}
