using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class Admin
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
