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

DELETE FROM Category
GO


INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_0_services', 'En', 'Services', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_0_services' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_0_services', 'Vn', N'Dịch vụ', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_0_services' AND Lang = 'Vn')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_1_regulation', 'En', 'Regulation', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_1_regulation' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_1_regulation', 'Vn', N'Quy định', '', NULL
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_1_regulation' AND Lang = 'Vn')
GO

/* SERVICES */
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_1', 'En', 'Radio and ICT products', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_1' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_2', 'En', 'Civil electricity - Industrial electricity', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_2' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_3', 'En', 'Office equipment', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_3' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_4', 'En', 'Civil cryptography products', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_4' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_5', 'En', 'Cyber security products', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_5' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_1', 'Vn', N'Sản phẩm vô tuyến, ICT', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_1' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_2', 'Vn', N'Điện dân dụng – Điện công nghiệp', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_2' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_3', 'Vn', N'Thiết bị văn phòng', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_3' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_4', 'Vn', N'Sản phẩm mật mã dân sự', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_4' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_svc_5', 'Vn', N'Sản phẩm an ninh mạng', '', 'cat_0_services'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_svc_5' AND Lang = 'Vn')
GO

/* REGULATION */
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_1', 'En', N'Notice', 'Continuously updated, accurate and fastest law notices. Meet the requirements of searching and preparing documents for certificates. Please contact us for more information.', 'cat_1_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_1' AND Lang = 'En')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_2', 'En', N'Published regulation', 'Legal notices issued are updated continuously, accurately and quickly. Meet the requirements of searching and preparing documents for certification. Please contact us for more information.', 'cat_1_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_2' AND Lang = 'En')
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_1', 'Vn', N'Thông cáo', N'Thông báo pháp luật được cập nhật liên tục, chính xác và nhanh nhất. Đáp ứng yêu cầu tra cứu và chuẩn bị hồ sơ xin cấp chứng chỉ. Vui lòng liên hệ với chúng tôi để biết thêm thông tin.', 'cat_1_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_1' AND Lang = 'Vn')
GO
INSERT INTO Category(Id, Lang, Name, Description, ParentId) 
SELECT 'cat_rel_2', 'Vn', N'Quy định đã ban hành', N'Các thông báo pháp lý ban hành được cập nhật liên tục, chính xác và nhanh chóng. Đáp ứng yêu cầu tra cứu và chuẩn bị hồ sơ xin cấp chứng chỉ. Vui lòng liên hệ với chúng tôi để biết thêm thông tin.', 'cat_1_regulation'
WHERE NOT EXISTS (SELECT * FROM Category WHERE Id = 'cat_rel_2' AND Lang = 'Vn')
GO


INSERT INTO [User](Id, Name, PASSWORD) 
SELECT 'admin', 'admin', 'a0997c8bf52cd6e3895310f5465dad5d' /*  GvCompany */
WHERE NOT EXISTS (SELECT * FROM [User] WHERE Id ='admin')
GO
