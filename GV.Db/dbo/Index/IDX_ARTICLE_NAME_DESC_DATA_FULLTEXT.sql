CREATE FULLTEXT CATALOG ArticleFullTextCatalog AS DEFAULT;
GO

CREATE FULLTEXT INDEX
	ON [dbo].[Article] (Name, Description, Data)
	KEY INDEX PK_Article	
	ON ArticleFullTextCatalog
	WITH CHANGE_TRACKING AUTO
GO