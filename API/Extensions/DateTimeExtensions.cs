using System;

namespace API.Extensions;

public static class DateTimeExtensions
{
   public static int CalculateAge(this DateOnly dob)
   {
      var today = DateOnly.FromDateTime(DateTime.UtcNow);

      var age = today.Year - dob.Year;       // age = 2024 - 1999 => 25

      if (dob > today.AddYears(-age)) age--; // if date of birth is later than today 25 years ago, reduce age by 1

      return age;  // doesn't account for leap years
   }
}
