using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using GV.Core;
using GV.Data;
using GV.Model;
using MultipartDataMediaFormatter.Infrastructure;
using Spire.Doc;
using Spire.Doc.Documents;
using Spire.Doc.Fields;
using Spire.Doc.Interface;

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

        public void GenerateProductRequestForm(string productId, Language lang)
        {
            var adapter = new ProductDataAdapter(Context);
            var product = adapter.GetById(productId);
            var templateFilePath = Path.Combine("Templates", $"product-form-{lang.ToString()}.docx");
            var document = MergeProduct(product, FSService.Instance.ReadFile(templateFilePath));
            string productFilePath = string.Empty;

            using (var ms = new MemoryStream())
            {
                document.SaveToStream(ms, FileFormat.Docx2013);
                productFilePath = FSService.Instance.SaveProductFile(productId, "product-information.docx", ms.GetBuffer());
            }

            EmailHelper.SendEmail("info@gvcompany.com", "New product register from web", "", productFilePath);
        }

        private Document MergeProduct(Product product, byte[] templateBytes)
        {
            using (var mstream = new MemoryStream(templateBytes))
            {
                var document = new Document(mstream);

                var fields = GetTemplateFields(document);
                foreach (var field in fields)
                {
                    var valueMapping = GetValueMapping(product, field);
                    if (valueMapping != null)
                    {
                        MergeField(document, product, field, valueMapping);
                    }
                }

                return document;
            }
        }

        private string GetValueMapping(Product p, string field)
        {
            var mappings = new Dictionary<string, string>
            {
                { "{!1}", p.Name },
                { "{!2}", p.Model },
                { "{!3}", p.Type },
                { "{!4}", p.Manufacturer },
                { "{!5}", p.PlaceOfManufacturing },
                { "{!6}", p.TechnicalSpecs.ToJson() },
                { "{!7}", p.ManufacturerISO9000CertNumber },
                { "{!8}", p.ISO9000CertVerifyLink },
                { "{!9}", p.ImporterDomesticManufacturer.Name },
                { "{!10}", p.ImporterDomesticManufacturer.Address },
                { "{!11}", p.ImporterDomesticManufacturer.Phone },
                { "{!12}", p.ImporterDomesticManufacturer.Fax },
                { "{!13}", p.ImporterDomesticManufacturer.Tax },
                { "{!14}", p.SerialNumber },
                { "{!15}", p.SerialPhotos.ToJson() },
                { "{!16}", p.WorkingFrequency },
                { "{!17}", p.Capacity },
                { "{!18}", p.SpuriousEmissionLevel },
                { "{!19}", p.Others },
                
            };
            if (mappings.ContainsKey(field))
            {
                return mappings[field] ?? string.Empty;
            }

            return null;
        }

        private List<string> GetTemplateFields(Document document)
        {
            var regexPattern = new Regex(@"\{!\d+}");
            var textSelections = document.FindAllPattern(regexPattern);
            var result = textSelections.Select(t => t.SelectedText).ToList();
            return result;
        }

        private void MergeField(Document document, Product p, string field, string value)
        {
            if (field == "{!6}")
            {
                var tFieldSelection = document.FindString(field, true, true);
                var range = tFieldSelection.GetAsOneRange();
                var tableValue = new List<Dictionary<string, string>> ();
                tableValue.Add(new Dictionary<string, string>{{"Index", "Index"}, {"Spec", "Spec"}});
                for(int i = 0; i < p.TechnicalSpecs.Count; i++)
                {
                    var spec = p.TechnicalSpecs[i];
                    tableValue.Add(new Dictionary<string, string>()
                    {
                        { "Index", Convert.ToString(i+1) },
                        { "Spec", spec }
                    });
                }
                MergeTableField(range, tableValue.ToJson());
            }
            else if (field == "{!15}")
            {
                var tFieldSelection = document.FindString(field, true, true);
                var paragraph = tFieldSelection.GetAsOneRange().OwnerParagraph;
                var images = value.ParseAs<List<string>>();
                foreach (var image in images)
                {
                    var pic = paragraph.AppendPicture(FSService.Instance.ReadFile(image.ParseAs<FileSystemObject>().Path));
                    var ow = pic.Width;
                    var oh = pic.Height;
                    pic.Height = 100.0f;
                    pic.Width = ow / oh * 100.0f;
                }
                document.Replace(field, string.Empty, true, true);
            }
            else
            {
                document.Replace(field, value, true, true);
            }
        }

        private void MergeTableField(TextRange range, string value)
        {
            var parentCell = GetParentCell(range);
            var parentRow = parentCell.Owner as TableRow;
            var parentTable = GetParentTable(range);
            var currentCellIndex = parentCell.GetCellIndex();
            var cellStyle = parentCell.Paragraphs[0].GetStyle();
            var tableValue = value.ParseAs<List<Dictionary<string, string>>>();
            if (tableValue == null) tableValue = new List<Dictionary<string, string>>();
            for(int row = 1; row < tableValue.Count; row++)
            {
                if (row > 1) parentRow = parentTable.AddRow(); 
                var tableRowValue = tableValue[row].ToList();
                var cIndex = currentCellIndex;
                for (int col = 0; col < tableValue[row].Count; col++)
                {
                    var cell = parentRow.Cells[cIndex];
                    if (cell.Paragraphs == null || cell.Paragraphs.Count == 0) cell.Paragraphs.Add(new Paragraph(range.Document));
                    cell.Paragraphs[0].Text = tableRowValue[col].Value;
                    cell.Paragraphs[0].ApplyStyle(cellStyle.Name);
                    cIndex++;
                    if (cIndex >= parentRow.Cells.Count) break;
                }                
            }
        }

        private Table GetParentTable(IDocumentObject obj)
        {
            if (obj == null) return null;
            if (obj is Table) return (Table)obj;
            return GetParentTable(obj.Owner);
        }

        private TableCell GetParentCell(IDocumentObject obj)
        {
            if (obj == null) return null;
            if (obj is TableCell) return (TableCell)obj;
            return GetParentCell(obj.Owner);
        }
    }
}
