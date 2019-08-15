CREATE PROCEDURE [dbo].[SP_ARTICLE_DELETEBYCATEGORY]
	@categoryId nvarchar(25)
AS
	DELETE FROM Article
	WHERE CategoryId = @categoryId
