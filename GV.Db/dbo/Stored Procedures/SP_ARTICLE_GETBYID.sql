CREATE PROCEDURE [dbo].[SP_ARTICLE_GETBYID]
	@id nvarchar(25),
	@lang nvarchar(3)
AS
	SELECT a.*
	FROM Article a
	WHERE a.Id = @id AND a.Lang = @lang
