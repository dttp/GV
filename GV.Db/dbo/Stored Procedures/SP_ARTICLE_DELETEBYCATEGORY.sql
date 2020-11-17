CREATE PROCEDURE [dbo].[SP_ARTICLE_DELETEBYCATEGORY]
	@p_categoryId nvarchar(25)
AS
	DELETE FROM Article
	WHERE CategoryId = @p_categoryId
