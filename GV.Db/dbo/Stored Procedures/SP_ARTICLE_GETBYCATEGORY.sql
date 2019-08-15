CREATE PROCEDURE [dbo].[SP_ARTICLE_GETBYCATEGORY]
	@categoryId nvarchar(25),
	@lang nvarchar(25)
AS
	SELECT a.* 
	FROM Article a
	WHERE a.CategoryId = @categoryId AND a.Lang = @lang
