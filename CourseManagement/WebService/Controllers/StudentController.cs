using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IRepository repository;
        public StudentController(IRepository repository, DataContext dataContext)
        {
            this.repository = repository;
            this.context = dataContext;
        }

        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent([FromBody] Student query)
        {
            try
            {
                Student student = new Student()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = query.FirstName,
                    LastName = query.LastName,
                    Email = query.Email,
                    Username = query.Username,
                    Department = query.Department,
                    PhoneNumber = query.PhoneNumber,
                    Roll = query.Roll,
                };
                Student studentByEmail = await this.repository.GetStudentByEmail(student.Email);
                if (studentByEmail != null)
                {
                    return BadRequest("Email Taken");
                }
                Student studentByPhone = await this.repository.GetStudentByPhone(student.PhoneNumber);
                if (studentByPhone != null)
                {
                    return BadRequest("Phone Number Taken");
                }
                Student studentByRoll = await this.repository.GetStudentByRoll(student.Roll);
                if (studentByRoll != null)
                {
                    return BadRequest("Roll Number Taken");
                }
                await context.Students.AddAsync(student);
                await context.SaveChangesAsync();
                return Ok(student);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetStudentById")]
        public async Task<IActionResult> GetStudentById([FromQuery] string id)
        {
            try
            {
                Student student = await this.repository.GetStudentById(id);
                return Ok(student);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetStudentByName")]
        public async Task<IActionResult> GetStudentByName([FromQuery] string name)
        {
            try
            {
                IEnumerable<Student> student = await this.repository.GetStudentByName(name);
                return Ok(student);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetStudents")]
        public async Task<IActionResult> GetStudents()
        {
            try
            {
                IEnumerable<Student> students = await this.repository.GetStudents().ConfigureAwait(false);
                return Ok(students);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpPost("UpdateStudent")]
        public async Task<IActionResult> UpdateStudent([FromBody] Student student)
        {
            try
            {
                Student studentData = await this.repository.GetStudentById(student.Id);
                if (studentData != null)
                {
                    studentData.FirstName = student.FirstName;
                    studentData.LastName = student.LastName;
                    studentData.Email = student.Email;
                    studentData.Username = student.Username;
                    studentData.Roll = student.Roll;
                    studentData.Department = student.Department;
                    studentData.PhoneNumber = student.PhoneNumber;

                    context.Students.Update(studentData);
                    await context.SaveChangesAsync();
                    return Ok(studentData);
                }
                else
                {
                    return BadRequest("Student Not Found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("DeleteStudent")]
        public async Task<IActionResult> DeleteStudent([FromQuery] string id)
        {
            try
            {
                Student studentData = await this.repository.GetStudentById(id);
                if (studentData != null)
                {
                    context.Students.Remove(studentData);
                    await context.SaveChangesAsync();
                    return Ok(studentData);
                }
                else
                {
                    return BadRequest("Student Not Found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
