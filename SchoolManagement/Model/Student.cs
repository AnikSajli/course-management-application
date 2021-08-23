using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Student
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Username { get; set; }
        public string Email { get; set; }
        public int Roll { get; set; }
        public string PhoneNumber { get; set; }
        public string Department { get; set; }
    }
}
