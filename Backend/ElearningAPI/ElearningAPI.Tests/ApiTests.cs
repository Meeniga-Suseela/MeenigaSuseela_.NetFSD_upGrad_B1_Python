using Xunit;
using Microsoft.AspNetCore.Mvc;

public class ApiTests
{
    [Fact]
    public void OkResponse_ShouldReturn200()
    {
        var result = new OkResult();

        Assert.Equal(200, result.StatusCode);
    }
}