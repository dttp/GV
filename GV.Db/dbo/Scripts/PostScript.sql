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


INSERT INTO Category(Id, Lang, Name, Description, ParentId) VALUES ('cat_services', 'En', 'Services', '', NULL);
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) VALUES ('cat_services', 'Vn', 'Dịch vụ', '', NULL);
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) VALUES ('cat_news', 'Vn', 'Tin tức', '', NULL);
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) VALUES ('cat_regulation', 'En', 'Regulation', '', NULL);
GO

INSERT INTO Category(Id, Lang, Name, Description, ParentId) VALUES ('cat_regulation', 'vn', 'Quy định', '', NULL);
GO

INSERT INTO [User](Id, Name, PASSWORD) VALUES ('admin', 'admin', 'c89835394bff2daa496426ea4c36ebfa')
GO
