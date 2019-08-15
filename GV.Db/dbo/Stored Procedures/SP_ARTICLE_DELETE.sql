CREATE PROCEDURE [dbo].[SP_ARTICLE_DELETE]
	@id nvarchar(25)
AS
	DELETE Article
	WHERE Id = @id;
