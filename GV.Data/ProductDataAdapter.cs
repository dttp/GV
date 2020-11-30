using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Model;

namespace GV.Data
{
    public class ProductDataAdapter : BaseAdapter
    {
        private const string SP_PRODUCT_INSERT = "SP_PRODUCT_INSERT";
        private const string SP_PRODUCT_UPDATE = "SP_PRODUCT_UPDATE";
        private const string SP_PRODUCT_GETBYID = "SP_PRODUCT_GETBYID";
        private const string SP_PRODUCT_FILTER = "SP_PRODUCT_FILTER";
        public ProductDataAdapter(WebAPIContext context) : base (context)
        {
            
        }

        public Product Insert(Product p)
        {
            p.Id = IdHelper.Generate();
            var param = new[]
            {
                new SqlParameter("@p_id", SqlDbType.NVarChar) {Value = p.Id},
                new SqlParameter("@p_Name", SqlDbType.NVarChar) {Value = p.Name},
                new SqlParameter("@p_Model", SqlDbType.NVarChar) {Value = p.Model},
                new SqlParameter("@p_Type", SqlDbType.NVarChar) {Value = p.Type},
                new SqlParameter("@p_Manufacturer", SqlDbType.NVarChar) {Value = p.Manufacturer},
                new SqlParameter("@p_PlaceOfManufacturing", SqlDbType.NVarChar) {Value = p.PlaceOfManufacturing},
                new SqlParameter("@p_TechnicalSpecs", SqlDbType.NVarChar) {Value = p.TechnicalSpecs.ToJson()},
                new SqlParameter("@p_ManufacturerISO9000CertNumber", SqlDbType.NVarChar) {Value = p.ManufacturerISO9000CertNumber},
                new SqlParameter("@p_ISO9000CertVerifyLink", SqlDbType.NVarChar) {Value = p.ISO9000CertVerifyLink},
                new SqlParameter("@p_ImporterName", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Name},
                new SqlParameter("@p_ImporterAddress", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Address},
                new SqlParameter("@p_ImporterPhone", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Phone},
                new SqlParameter("@p_ImporterTax", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Tax},
                new SqlParameter("@p_ImporterFax", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Fax},
                new SqlParameter("@p_SerialPhotos", SqlDbType.NVarChar) {Value = p.SerialPhotos.ToJson()},
                new SqlParameter("@p_SerialNumber", SqlDbType.NVarChar) {Value = p.SerialNumber },
            };

            Call(SP_PRODUCT_INSERT, param);

            return p;
        }

        public void Update(Product p)
        {
            var param = new[]
            {
                new SqlParameter("@p_id", SqlDbType.NVarChar) {Value = p.Id},
                new SqlParameter("@p_Name", SqlDbType.NVarChar) {Value = p.Name},
                new SqlParameter("@p_Model", SqlDbType.NVarChar) {Value = p.Model},
                new SqlParameter("@p_Type", SqlDbType.NVarChar) {Value = p.Type},
                new SqlParameter("@p_Manufacturer", SqlDbType.NVarChar) {Value = p.Manufacturer},
                new SqlParameter("@p_PlaceOfManufacturing", SqlDbType.NVarChar) {Value = p.PlaceOfManufacturing},
                new SqlParameter("@p_TechnicalSpecs", SqlDbType.NVarChar) {Value = p.TechnicalSpecs.ToJson()},
                new SqlParameter("@p_ManufacturerISO9000CertNumber", SqlDbType.NVarChar) {Value = p.ManufacturerISO9000CertNumber},
                new SqlParameter("@p_ISO9000CertVerifyLink", SqlDbType.NVarChar) {Value = p.ISO9000CertVerifyLink},
                new SqlParameter("@p_ImporterName", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Name},
                new SqlParameter("@p_ImporterAddress", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Address},
                new SqlParameter("@p_ImporterPhone", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Phone},
                new SqlParameter("@p_ImporterTax", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Tax},
                new SqlParameter("@p_ImporterFax", SqlDbType.NVarChar) {Value = p.ImporterDomesticManufacturer.Fax},
                new SqlParameter("@p_SerialPhotos", SqlDbType.NVarChar) {Value = p.SerialPhotos.ToJson()},
                new SqlParameter("@p_SerialNumber", SqlDbType.NVarChar) {Value = p.SerialNumber},
                new SqlParameter("@p_Capacity", SqlDbType.NVarChar) {Value = p.Capacity},
                new SqlParameter("@p_SpuriousEmissionLevel", SqlDbType.NVarChar) {Value = p.SpuriousEmissionLevel},
                new SqlParameter("@p_Others", SqlDbType.NVarChar) {Value = p.Others},
                new SqlParameter("@p_WorkingFrequency", SqlDbType.NVarChar) {Value = p.WorkingFrequency},
            };
            Call(SP_PRODUCT_UPDATE, param);
        }

        public Product GetById(string id)
        {
            var param = new[]
            {
                new SqlParameter("@P_Id", id),
            };
            return Call(SP_PRODUCT_GETBYID, param, DataHelper.ReadProduct).Items.FirstOrDefault();
        }
        public PaginationResult<Product> Filter(int startIndex = 0, int pageSize = 50, string sortBy = "CreatedDate",
            bool sortAsc = false)
        {
            var param = new[]
            {
                new SqlParameter("@p_startIndex", SqlDbType.Int) {Value = startIndex},
                new SqlParameter("@p_pageSize", SqlDbType.Int) {Value = pageSize},
                new SqlParameter("@p_SortBy", SqlDbType.NVarChar) {Value = sortBy},
                new SqlParameter("@p_SortAsc", SqlDbType.Int) {Value = sortAsc ? 1 : 0},
            };

            return Call(SP_PRODUCT_FILTER, param, DataHelper.ReadProduct);
        }
    }
}
