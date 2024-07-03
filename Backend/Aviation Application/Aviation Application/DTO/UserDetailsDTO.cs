namespace Aviation_Application.DTO
{
    public class UserDetailsDTO
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public DateTime Dob { get; set; }

        public string Gender { get; set; } = null!;

        public string EmailId { get; set; } = null!;

        public long Phone { get; set; }
    }
}
