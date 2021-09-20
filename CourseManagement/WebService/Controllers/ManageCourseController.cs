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
    public class ManageCourseController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IRepository repository;
        public ManageCourseController(IRepository repository, DataContext dataContext)
        {
            this.repository = repository;
            this.context = dataContext;
        }

        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent([FromBody] CourseRegistration query)
        {
            try
            {
                CourseRegistration courseReg = new CourseRegistration()
                {
                    Id = Guid.NewGuid().ToString(),
                    CourseId = query.CourseId,
                    StudentId = query.StudentId,
                };
                await context.CourseRegistrations.AddAsync(courseReg);
                await context.SaveChangesAsync();
                return Ok(courseReg);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("RemoveStudent")]
        public async Task<IActionResult> RemoveStudent([FromBody] CourseRegistration query)
        {
            try
            {
                CourseRegistration courseData = await this.repository.GetCourseRegistrationByIdAndStudentId(query.CourseId, query.StudentId);
                if (courseData != null)
                {
                    context.CourseRegistrations.Remove(courseData);
                    await context.SaveChangesAsync();
                    return Ok(courseData);
                }
                else
                {
                    return BadRequest("Course Not Found");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("GetStudentsByCourse")]
        public async Task<IActionResult> GetStudentsByCourse([FromQuery] string courseId)
        {
            try
            {
                IEnumerable<CourseRegistration> courseDatas = await this.repository.GetStudentsByCourse(courseId);
                return Ok(courseDatas);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
