using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string Type { get; set; }
        public string Manufacturer { get; set; }
        public string PlaceOfManufacturing { get; set; }
        public List<string> TechnicalSpecs { get; set; }
        public string ManufacturerISO9000CertNumber { get; set; }
        public string ISO9000CertVerifyLink { get; set; }
        public Company ImporterDomesticManufacturer { get; set; }

        public List<string> SerialPhotos { get; set; }
        public string WorkingFrequency { get; set; }
        public string Capacity { get; set; }
        public string SpuriousEmissionLevel { get; set; }
        public string Others { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class Company
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Tax { get; set; }
    }
}
