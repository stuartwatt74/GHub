namespace GHub.Models
{
    public interface IDisplayModel
    {
        string EventName { get; set; }
        TimeModel Time { get; set; }
    }
}