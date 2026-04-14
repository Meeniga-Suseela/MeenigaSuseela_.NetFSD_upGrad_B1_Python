using Xunit;
using Moq;
using AutoMapper;
using ElearningAPI.Services;
using ElearningAPI.Repositories;
using ElearningAPI.DTOs;
using ElearningAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ElearningAPI.Tests
{
    public class CourseServiceTests
    {
        private readonly Mock<ICourseRepository> _repoMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly CourseService _service;

        public CourseServiceTests()
        {
            _repoMock = new Mock<ICourseRepository>();
            _mapperMock = new Mock<IMapper>();
            _service = new CourseService(_repoMock.Object, _mapperMock.Object);
        }

        // ✅ CREATE TEST
        [Fact]
        public async Task CreateCourse_ShouldReturnCourseDto()
        {
            var dto = new CourseDto
            {
                Title = "Test",
                Description = "Desc",
                CreatedBy = 1
            };

            var course = new Course();

            _mapperMock.Setup(m => m.Map<Course>(It.IsAny<CourseDto>()))
                       .Returns(course);

            _mapperMock.Setup(m => m.Map<CourseDto>(It.IsAny<Course>()))
                       .Returns(dto);

            _repoMock.Setup(r => r.Add(It.IsAny<Course>()))
                     .Returns(Task.CompletedTask);

            var result = await _service.CreateCourse(dto);

            Assert.NotNull(result);
            Assert.Equal("Test", result.Title);
        }

        // ✅ GET ALL TEST
        [Fact]
        public async Task GetAllCourses_ShouldReturnList()
        {
            var courses = new List<Course> { new Course(), new Course() };
            var dtos = new List<CourseDto>
            {
                new CourseDto { Title = "A" },
                new CourseDto { Title = "B" }
            };

            _repoMock.Setup(r => r.GetAll()).ReturnsAsync(courses);
            _mapperMock.Setup(m => m.Map<IEnumerable<CourseDto>>(courses))
                       .Returns(dtos);

            var result = await _service.GetAllCourses();

            Assert.NotNull(result);
        }

        // ✅ GET BY ID TEST
        [Fact]
        public async Task GetCourseById_ShouldReturnCourse()
        {
            var course = new Course();
            var dto = new CourseDto { Title = "Test" };

            _repoMock.Setup(r => r.GetById(1)).ReturnsAsync(course);
            _mapperMock.Setup(m => m.Map<CourseDto>(course)).Returns(dto);

            var result = await _service.GetCourseById(1);

            Assert.NotNull(result);
        }

        // ✅ UPDATE TEST
        [Fact]
        public async Task UpdateCourse_ShouldReturnTrue()
        {
            var course = new Course();
            var dto = new CourseDto
            {
                Title = "Updated",
                Description = "Updated",
                CreatedBy = 1
            };

            _repoMock.Setup(r => r.GetById(1)).ReturnsAsync(course);
            _repoMock.Setup(r => r.Update(It.IsAny<Course>()))
                     .Returns(Task.CompletedTask);

            var result = await _service.UpdateCourse(1, dto);

            Assert.True(result);
        }

        // ✅ DELETE TEST
        [Fact]
        public async Task DeleteCourse_ShouldReturnTrue()
        {
            var course = new Course();

            _repoMock.Setup(r => r.GetById(1)).ReturnsAsync(course);
            _repoMock.Setup(r => r.Delete(It.IsAny<Course>()))
                     .Returns(Task.CompletedTask);

            var result = await _service.DeleteCourse(1);

            Assert.True(result);
        }
    }
}