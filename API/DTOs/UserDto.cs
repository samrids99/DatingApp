using System;

namespace API.DTOs;

public class UserDto
{
    public string Username { get; set;}

    public string Token { get; set;}

    public string PhotoUrl { get; set; }

    public string KnownAs { get; set; }

    public string Gender { get; set; }

    public string Address { get; set; }
    public List<string> Hobbies { get; set; }
    public bool NotActive { get; set; }
}
