using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Teacher>> GetTeachers()
        {
            var users = await _context.Teachers.ToListAsync();
            return users;
        }

        public async Task<Teacher> GetTeacherById(string id)
        {
            var teacher = await _context.Teachers.FirstOrDefaultAsync(u => u.Id == id);
            return teacher;
        }

        public async Task<IEnumerable<Teacher>> GetTeacherByName(string name)
        {
            var teachers = await _context.Teachers.ToListAsync();
            teachers = teachers.FindAll(e => e.FullName.ToLower().Contains(name.ToLower()));
            return teachers;
        }

        public async Task<IEnumerable<Student>> GetStudents()
        {
            var students = await _context.Students.ToListAsync();
            return students;
        }

        public async Task<Student> GetStudentById(string id)
        {
            var student = await _context.Students.FirstOrDefaultAsync(u => u.Id == id);
            return student;
        }

        public async Task<IEnumerable<Student>> GetStudentByName(string name)
        {
            var teachers = await _context.Students.ToListAsync();
            teachers = teachers.FindAll(e => e.FullName.ToLower().Contains(name.ToLower()));
            return teachers;
        }

        public async Task<IEnumerable<Course>> GetCourses()
        {
            var courses = await _context.Courses.ToListAsync();
            return courses;
        }

        public async Task<IEnumerable<Course>> GetCourseByName(string name)
        {
            var courses = await _context.Courses.ToListAsync();
            courses = courses.FindAll(e => e.CourseName.ToLower().Contains(name.ToLower()));
            return courses;
        }

        public async Task<Course> GetCourseById(string id)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(u => u.Id == id);
            return course;
        }

        public async Task<CourseRegistration> GetCourseRegistrationByIdAndStudentId(string courseId, string studentId)
        {
            return await _context.CourseRegistrations.FirstOrDefaultAsync(u => u.CourseId == courseId && u.StudentId == studentId);
        }

        public async Task<IEnumerable<CourseRegistration>> GetStudentsByCourse(string courseId)
        {
            var courseRegistrations = await _context.CourseRegistrations.ToListAsync();
            courseRegistrations = courseRegistrations.FindAll(e => e.CourseId == courseId);
            return courseRegistrations;
        }
    }
}
