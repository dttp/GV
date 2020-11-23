using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GV.Core;
using GV.Data;
using GV.Model;
using MultipartDataMediaFormatter.Infrastructure;

namespace GV.Services
{
    public class ProductService : BaseService
    {
        public ProductService(WebAPIContext context) : base(context)
        {
        }

        public Product Insert(Product p)
        {
            var adapter = new ProductDataAdapter(Context);
            return adapter.Insert(p);
        }

        public void UploadPhotos(FormData formData)
        {
            FSService.Instance.UploadProductPhotos(formData);

            var pidField = formData.Fields.FirstOrDefault(f => f.Name.Equals("ProductId", StringComparison.InvariantCultureIgnoreCase));
            if (pidField != null)
            {
                var adapter = new ProductDataAdapter(Context);
                var product = adapter.GetById(pidField.Value);

                var path = Path.Combine("Product", product.Id);
                var items = FSService.Instance.GetList(path);
                product.SerialPhotos = items.Select(f => f.ToJson()).ToList();

                adapter.Update(product);
            }
        }

        public Product GetById(string id)
        {
            var adapter = new ProductDataAdapter(Context);
            return adapter.GetById(id);
        }

        public PaginationResult<Product> Filter(int startIndex, int pageSize, string sortBy, bool sortAsc)
        {
            var adapter = new ProductDataAdapter(Context);
            return adapter.Filter(startIndex, pageSize, sortBy, sortAsc);
        }
    }
}
