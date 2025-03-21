using System.Collections.Generic;
using System.Text.Json.Serialization;

public class Observation
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<DataEntry> Datas { get; set; }
}

public class DataEntry
{
    public string SamplingTime { get; set; }
    public List<Property> Properties { get; set; }
}

public class Property
{
    public object Value { get; set; }
    public string Label { get; set; }
}
