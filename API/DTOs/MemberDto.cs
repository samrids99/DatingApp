namespace API.DTOs;

public class MemberDto
{
  public int Id { get; set; }
  public string UserName { get; set; }
  public string PhotoUrl { get; set; } // property for main photo url
  public int Age { get; set; }
  public string KnownAs { get; set; }
  public DateTime Created { get; set; } = DateTime.UtcNow;
  public DateTime LastActive { get; set; } = DateTime.UtcNow;
  public string Gender { get; set; }
  public string Introduction { get; set; }
  public string LookingFor { get; set;}
  public string Interests { get; set; }
  public List<string> Hobbies { get; set; }
  public string Address { get; set; }
  public string City { get; set; }
  public string Country { get; set; }
  public List<PhotoDto> Photos { get; set; }

}

