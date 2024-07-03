using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class Notification
{
    public int NotificationId { get; set; }

    public string UserId { get; set; } = null!;

    public string Message { get; set; } = null!;

    public DateTime? NotificationDate { get; set; }
}
