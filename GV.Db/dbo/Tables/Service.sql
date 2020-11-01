CREATE TABLE [dbo].[Service]
(
	[Id] NVARCHAR(25) NOT NULL , 
    [Lang] NVARCHAR(3) NOT NULL, 
    [Name] NVARCHAR(100) NOT NULL, 
    [ArticleId] NVARCHAR(25) NOT NULL, 
    PRIMARY KEY ([Id], [Lang])
)
