CREATE PROCEDURE [dbo].[SP_CATEGORY_GETBYID]
	@id NVARCHAR(25),
	@lang NVARCHAR(3)
AS
	SELECT 
		* 
	FROM
		[Category]
	WHERE
		Id = @id AND
		Lang = @lang;
