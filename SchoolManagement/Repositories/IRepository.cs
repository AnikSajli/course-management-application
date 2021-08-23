using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Teacher>> GetTeachers();
        Task<Teacher> GetTeacherById(string id);
        Task<IEnumerable<Teacher>> GetTeacherByName(string name);
        Task<IEnumerable<Student>> GetStudents();
        Task<Student> GetStudentById(string id);
        Task<IEnumerable<Student>> GetStudentByName(string name);
        Task<IEnumerable<Course>> GetCourses();
        Task<IEnumerable<Course>> GetCourseByName(string name);
        Task<Course> GetCourseById(string id);
        Task<CourseRegistration> GetCourseRegistrationByIdAndStudentId(string courseId, string studentId);
        Task<IEnumerable<CourseRegistration>> GetStudentsByCourse(string courseId);
    }
}
