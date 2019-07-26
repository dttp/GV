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
    PRIMARY KEY ([Id], [Lang])
)
