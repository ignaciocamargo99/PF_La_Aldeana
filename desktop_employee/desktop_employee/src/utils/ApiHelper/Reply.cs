public class Reply
{
    public string StatusCode { get; set; }
    public object Data { get; set; }
}

public enum methodHttp
{
    GET,
    POST,
    PUT,
    DELETE
}
