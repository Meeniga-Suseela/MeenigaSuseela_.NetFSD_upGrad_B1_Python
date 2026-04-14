using Xunit;
using System.Collections.Generic;
using System.Linq;

public class LinqTests
{
    [Fact]
    public void FilterCourses_ShouldWork()
    {
        var courses = new List<string> { "Java", "C#", "Python" };

        var result = courses.Where(c => c.Contains("C")).ToList();

        Assert.Single(result);
        Assert.Equal("C#", result[0]);
    }
}