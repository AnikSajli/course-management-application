using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Course
    {
        public string Id { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public double CourseCredit { get; set; }
        public string TeacherId { get; set; }
    }
}
