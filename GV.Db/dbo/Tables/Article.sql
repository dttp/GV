CREATE TABLE [dbo].[Article]
(
	[Id] NVARCHAR(25) NOT NULL , 
    [Lang] NVARCHAR(3) NOT NULL, 
    [Name] NVARCHAR(1024) NOT NULL, 
    [Description] NVARCHAR(500) NULL DEFAULT null, 
    [Data] NVARCHAR(MAX) NULL, 
    [CreatedDate] DATETIME NOT NULL, 
    [CategoryId] NVARCHAR(25) NOT NULL, 
    [Visible] BIT NOT NULL DEFAULT 1, 
    [Thumbnail] NVARCHAR(1000) NULL, 
    [LastModifiedDate] DATETIME NOT NULL, 
    [CategotyId] NVARCHAR(25) NULL, 
    PRIMARY KEY ([Id], [Lang])
)

GO
