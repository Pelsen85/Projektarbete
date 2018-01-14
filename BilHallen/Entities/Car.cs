using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilHallen.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Transmission { get; set; }
        public string RegNumber { get; set; }
        public string Type { get; set; }
        public int NumberOfOwners { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public int Kilometers { get; set; }
        public int Price { get; set; }
        public int HorsePowers { get; set; }
        public string City { get; set; }
        public string ImageUrl { get; set; }
    }
}
