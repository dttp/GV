CREATE TABLE [dbo].[Category] (
    [Id]          NVARCHAR (25)  NOT NULL,
    [Lang]        NVARCHAR (3)   NOT NULL,
    [Name]        NVARCHAR (100) NULL,
    [Description] NVARCHAR (500) NULL,
    [ParentId]    NVARCHAR (25)  NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([Id] ASC, [Lang] ASC)
);

