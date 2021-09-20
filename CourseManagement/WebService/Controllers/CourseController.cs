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
    public class CourseController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IRepository repository;
        public CourseController(IRepository repository, DataContext dataContext)
        {
            this.repository = repository;
            this.context = dataContext;
        }
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] Course query)
        {
            try
            {
                Course course = new Course()
                {
                    Id = Guid.NewGuid().ToString(),
                    CourseCode = query.CourseCode,
                    CourseName = query.CourseName,
                    CourseCredit = query.CourseCredit,
                    TeacherId = query.TeacherId,
                };
                Course courseCode = await this.repository.GetCourseByCode(course.CourseCode);
                if (courseCode != null)
                {
                    return BadRequest("Course Code Taken");
                }
                await context.Courses.AddAsync(course);
                await context.SaveChangesAsync();
                return Ok(course);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetCourseById")]
        public async Task<IActionResult> GetCourseById([FromQuery] string id)
        {
            try
            {
                Course course = await this.repository.GetCourseById(id);
                return Ok(course);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetCourseByName")]
        public async Task<IActionResult> GetCourseByName([FromQuery] string name)
        {
            try
            {
                IEnumerable<Course> course = await this.repository.GetCourseByName(name);
                return Ok(course);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("GetCourses")]
        public async Task<IActionResult> GetCourses()
        {
            try
            {
                IEnumerable<Course> courses = await this.repository.GetCourses().ConfigureAwait(false);
                return Ok(courses);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpPost("UpdateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] Course course)
        {
            try
            {
                Course courseData = await this.repository.GetCourseById(course.Id);
                if (courseData != null)
                {
                    courseData.CourseCode = course.CourseCode;
                    courseData.CourseCredit = course.CourseCredit;
                    courseData.CourseName = course.CourseName;
                    courseData.TeacherId = course.TeacherId;

                    context.Courses.Update(courseData);
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

        [HttpGet("DeleteCourse")]
        public async Task<IActionResult> DeleteCourse([FromQuery] string id)
        {
            try
            {
                Course courseData = await this.repository.GetCourseById(id);
                if (courseData != null)
                {
                    context.Courses.Remove(courseData);
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
    }
}
