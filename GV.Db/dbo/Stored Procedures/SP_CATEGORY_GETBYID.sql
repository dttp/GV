CREATE PROCEDURE [dbo].[SP_CATEGORY_GETBYID]
	@p_id NVARCHAR(25),
	@p_lang NVARCHAR(3)
AS
	SELECT 
		* 
	FROM
		[Category]
	WHERE
		Id = @p_id AND
		Lang = @p_lang;
