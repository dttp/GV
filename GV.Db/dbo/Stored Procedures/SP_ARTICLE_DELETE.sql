CREATE PROCEDURE [dbo].[SP_ARTICLE_DELETE]
	@p_id nvarchar(25)
AS
	DELETE Article
	WHERE Id = @p_id;
