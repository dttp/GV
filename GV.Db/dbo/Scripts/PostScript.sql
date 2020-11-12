/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

/* DEFAULT CATEGORIES  */


INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_services', 'En', 'Services', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_services' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_services', 'Vn', N'Dịch vụ', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_services' AND Lang = 'Vn')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news', 'En', N'News', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news', 'Vn', N'Tin tức', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news' AND Lang = 'Vn')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_regulation', 'En', 'Regulation', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_regulation' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_regulation', 'Vn', N'Quy định', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_regulation' AND Lang = 'Vn')
GO

/* SERVICES */
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_1', 'En', 'Radio and ICT products', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_1' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_2', 'En', 'Civil electricity - Industrial electricity', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_2' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_3', 'En', 'Office equipment', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_3' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_4', 'En', 'Civil cryptography products', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_4' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_5', 'En', 'Cyber security products', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_5' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_1', 'Vn', N'Sản phẩm vô tuyến, ICT', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_1' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_2', 'Vn', N'Điện dân dụng – Điện công nghiệp', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_2' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_3', 'Vn', N'Thiết bị văn phòng', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_3' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_4', 'Vn', N'Sản phẩm mật mã dân sự', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_4' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_5', 'Vn', N'Sản phẩm an ninh mạng', '', 'cat_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_5' AND Lang = 'Vn')
GO

/* NEWS*/
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news_1', 'En', N'Draft regulations and circulars', '', 'cat_news'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news_1' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news_2', 'En', N'Issued documents', '', 'cat_news'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news_2' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news_3', 'En', N'Updated News', '', 'cat_news'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news_3' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news_1', 'Vn', N'Dự thảo quy chuẩn, thông tư', '', 'cat_news'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news_1' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news_2', 'Vn', N'Văn bản ban hành', '', 'cat_news'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news_2' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_news_3', 'Vn', N'Tin tức mới', '', 'cat_news'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_news_3' AND Lang = 'Vn')
GO

/* REGULATION */
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_1', 'En', N'Import procedures', '', 'cat_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_1' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_2', 'En', N'License sample seal', '', 'cat_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_2' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_1', 'Vn', N'Thủ tục nhập khẩu', '', 'cat_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_1' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_2', 'Vn', N'Giấy phép mẫu dấu ', '', 'cat_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_2' AND Lang = 'Vn')
GO


INSERT INTO [User](Id, Name, PASSWORD) 
SELECT 'admin', 'admin', 'a0997c8bf52cd6e3895310f5465dad5d' /*  GvCompany */
WHERE NOT EXISTS (SELECT * FROM [User] WHERE Id ='admin')
GO
