using Aviation_Application.DTO;
using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly AviationContext context;

        public UserDetailsController(AviationContext context)
        {
                this.context=context;
        }
        [HttpGet("GetAllUsersProfiles")]
        public ActionResult GetAllUsersProfiles() { 
            var allUsers=context.UserDetails.ToList();
            return Ok(allUsers);
        }

        [HttpGet("GetUserProfileByEmailID/{emailID}")]
        public ActionResult GetUserProfileByEmailID(string emailID)
        {
            if (string.IsNullOrEmpty(emailID))
            {
                return BadRequest("EmailID cannot be null or empty.");
            }

            var userProfile = context.UserDetails.FirstOrDefault(x => x.EmailId == emailID);

            if (userProfile == null)
            {
                return NotFound($"User with email ID {emailID} not found.");
            }

            return Ok(userProfile);
        }


        [HttpPost("AddNewUser")]


        public ActionResult AddNewUser(UserDetailsDTO userDetailsDTO )
        {
            try
            {
                var newUser = new UserDetail
                {
                    FirstName = userDetailsDTO.FirstName,
                    LastName = userDetailsDTO.LastName,
                    Dob = userDetailsDTO.Dob,
                    Gender = userDetailsDTO.Gender,
                    EmailId = userDetailsDTO.EmailId,
                    Phone = userDetailsDTO.Phone,
                };

                context.UserDetails.Add(newUser);
                context.SaveChanges();
                return Ok(newUser);
            }catch (Exception ex) { 
            
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("EditUserProfile/{emailId}")]
        public ActionResult EditUserProfile(string emailId,UserDetailsDTO userDetailsDTO) {
            try
            {
                var profile = context.UserDetails.SingleOrDefault(x => x.EmailId == emailId);
                if(profile == null) {

                    return BadRequest("User not Found");

                }
                else
                {
                    profile.FirstName = userDetailsDTO.FirstName;
                    profile.LastName = userDetailsDTO.LastName;
                    profile.Dob = userDetailsDTO.Dob;
                    profile.Gender = userDetailsDTO.Gender;
                    //profile.EmailId = userDetailsDTO.EmailId;
                    profile.Phone = userDetailsDTO.Phone;

                    return Ok(profile);

                }
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
