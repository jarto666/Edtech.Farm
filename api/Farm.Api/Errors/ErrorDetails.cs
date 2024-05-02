namespace Farm.Api.Errors;

public class ErrorDetails(string message, ErrorCode errorCode)
{
    public string Message { get; } = message;
    public ErrorCode ErrorCode { get; } = errorCode;
}