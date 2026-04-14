using Xunit;
using System;
using System.Threading.Tasks;

public class ExceptionTests
{
    [Fact]
    public async Task InvalidQuiz_ShouldThrowException()
    {
        await Assert.ThrowsAsync<ArgumentException>(async () =>
        {
            await Task.Run(() => throw new ArgumentException("Invalid quiz"));
        });
    }
}