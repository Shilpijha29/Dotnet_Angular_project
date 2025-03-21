using System;
using System.IO;
using System.Text.Json;

public class DataService
{
    private readonly string filePath = @"C:\Users\abhin\Dotnet_Angular_Project\data.json";

    public Observation GetData()
    {
        try
        {
            if (!File.Exists(filePath))
            {
                Console.WriteLine("File does not exist.");
                return new Observation(); // Return empty object if file doesn't exist
            }

            var json = File.ReadAllText(filePath);

            if (string.IsNullOrWhiteSpace(json))
            {
                Console.WriteLine("JSON file is empty.");
                return new Observation();
            }

            return JsonSerializer.Deserialize<Observation>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new Observation();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading JSON: {ex.Message}");
            return new Observation();
        }
    }

    public void SaveData(Observation data)
    {
        try
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(filePath, json);
            Console.WriteLine("Data successfully saved to JSON file.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving JSON: {ex.Message}");
        }
    }
}
