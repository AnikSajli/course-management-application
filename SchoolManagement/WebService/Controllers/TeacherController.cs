using Microsoft.AspNetCore.Mvc;
using Model;
using Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeacherController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IRepository repository;
        public TeacherController(IRepository repository, DataContext dataContext)
        {
            this.repository = repository;
            this.context = dataContext;
        }

        [HttpPost("AddTeacher")]
        public async Task<IActionResult> AddTeacher([FromBody] Teacher query)
        {
            try
            {
                Teacher teacher = new Teacher()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = query.FirstName,
                    LastName = query.LastName,
                    Email = query.Email,
                    Username = query.Username,
                    Department = query.Department,
                    PhoneNumber = query.PhoneNumber,
                };
                await context.Teachers.AddAsync(teacher);
                await context.SaveChangesAsync();
                return Ok(teacher);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
           
        }

        [HttpGet("GetTeacherById")]
        public async Task<IActionResult> GetTeacherById([FromQuery] string id)
        {
            try
            {
                Teacher teacher = await this.repository.GetTeacherById(id);
                return Ok(teacher);
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("GetTeacherByName")]
        public async Task<IActionResult> GetTeacherByName([FromQuery] string name)
        {
            try
            {
                IEnumerable<Teacher> teacher = await this.repository.GetTeacherByName(name);
                return Ok(teacher);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetTeachers")]
        public async Task<IActionResult> GetTeachers()
        {
            try
            {
                IEnumerable<Teacher> teachers = await this.repository.GetTeachers().ConfigureAwait(false);
                return Ok(teachers);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpPost("UpdateTeacher")]
        public async Task<IActionResult> UpdateTeacher([FromBody] Teacher teacher)
        {
            try
            {
                Teacher teacherData = await this.repository.GetTeacherById(teacher.Id);
                if(teacherData != null)
                {
                    teacherData.FirstName = teacher.FirstName;
                    teacherData.LastName = teacher.LastName;
                    teacherData.Email = teacher.Email;
                    teacherData.Username = teacher.Username;
                    teacherData.PhoneNumber = teacher.PhoneNumber;
                    teacherData.Department = teacher.Department;

                    context.Teachers.Update(teacherData);
                    await context.SaveChangesAsync();
                    return Ok(teacherData);
                }
                else
                {
                    return BadRequest("Teacher Not Found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("DeleteTeacher")]
        public async Task<IActionResult> DeleteTeacher([FromQuery] string id)
        {
            try
            {
                Teacher teacherData = await this.repository.GetTeacherById(id);
                if (teacherData != null)
                {
                    context.Teachers.Remove(teacherData);
                    await context.SaveChangesAsync();
                    return Ok(teacherData);
                }
                else
                {
                    return BadRequest("Teacher Not Found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
