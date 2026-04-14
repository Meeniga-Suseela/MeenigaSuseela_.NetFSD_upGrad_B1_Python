using Microsoft.AspNetCore.Mvc;
using ElearningAPI.Services;
using ElearningAPI.DTOs;

namespace ElearningAPI.Controllers
{
    [ApiController]
    [Route("api/courses")]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _service;

        public CoursesController(ICourseService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllCourses());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _service.GetCourseById(id);
            if (course == null) return NotFound();

            return Ok(course);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CourseDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var course = await _service.CreateCourse(dto);
            return StatusCode(201, course);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CourseDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var result = await _service.UpdateCourse(id, dto);
            if (!result) return NotFound();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteCourse(id);
            if (!result) return NotFound();

            return Ok();
        }
    }
}