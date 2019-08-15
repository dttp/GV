CREATE TABLE [dbo].[Article]
(
	[Id] NVARCHAR(25) NOT NULL , 
    [Lang] NVARCHAR(3) NOT NULL, 
    [Name] NVARCHAR(100) NULL, 
    [Description] NVARCHAR(500) NULL DEFAULT null, 
    [Data] NVARCHAR(MAX) NULL, 
    [CreatedDate] DATETIME NULL, 
    [CategoryId] NVARCHAR(25) NOT NULL, 
    [Visible] BIT NOT NULL DEFAULT 1, 
    [Thumbnail] NVARCHAR(1000) NULL, 
    [ViewCount] INT NOT NULL DEFAULT 0, 
    PRIMARY KEY ([Id], [Lang])
)
