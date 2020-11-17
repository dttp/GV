CREATE TABLE [dbo].[Article]
(
	[Id] NVARCHAR(25) NOT NULL , 
    [Lang] NVARCHAR(3) NOT NULL, 
    [Name] NVARCHAR(1024) NOT NULL, 
    [Description] NVARCHAR(500) NULL DEFAULT null, 
    [Data] NVARCHAR(MAX) NULL, 
    [CreatedDate] DATETIME NOT NULL, 
    [CategoryId] NVARCHAR(25) NOT NULL, 
    [Thumbnail] NVARCHAR(1000) NULL, 
    [LastModifiedDate] DATETIME NOT NULL, 
    PRIMARY KEY ([Id], [Lang])
)

GO
