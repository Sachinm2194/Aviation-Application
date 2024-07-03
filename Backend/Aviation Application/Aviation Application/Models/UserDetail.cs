using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class UserDetail
{
    public int UserId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime Dob { get; set; }

    public string Gender { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public long Phone { get; set; }

    public DateTime? AcoountCreated { get; set; }
}
