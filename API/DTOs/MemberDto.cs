namespace API.DTOs;

public class MemberDto
{
  public int Id { get; set; }
  public string UserName { get; set; }
  public int Age;
  public string KnownAs { get; set; }
  public DateTime Created { get; set; } = DateTime.UtcNow;
  public DateTime LastActive { get; set; } = DateTime.UtcNow;
  public string Gender { get; set; }
  public string Introduction { get; set; }
  public string Interests { get; set; }
  public string City { get; set; }
  public string Country { get; set; }
  public List<PhotoDto> Photos { get; set; }

}

