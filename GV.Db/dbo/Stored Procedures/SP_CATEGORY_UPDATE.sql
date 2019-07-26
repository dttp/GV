CREATE PROCEDURE [dbo].[SP_CATEGORY_UPDATE]
	@id NVARCHAR(25),
	@lang NVARCHAR(3),
	@name NVARCHAR(100),
	@description NVARCHAR(500) = NULL
AS
	UPDATE 
		[Category]
	SET
		Name = @name,
		Description = @description
	WHERE Id = @id AND Lang = @lang;

