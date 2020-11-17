CREATE PROCEDURE [dbo].[SP_ARTICLE_GETBYID]
	@p_id nvarchar(25),
	@p_lang nvarchar(3)
AS
	SELECT a.*
	FROM Article a
	WHERE a.Id = @p_id AND a.Lang = @p_lang
