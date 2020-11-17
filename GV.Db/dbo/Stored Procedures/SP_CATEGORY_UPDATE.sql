CREATE PROCEDURE [dbo].[SP_CATEGORY_UPDATE]
	@p_id NVARCHAR(25),
	@p_lang NVARCHAR(3),
	@p_name NVARCHAR(100),
	@p_description NVARCHAR(500) = NULL
AS
	UPDATE 
		[Category]
	SET
		Name = @p_name,
		Description = @p_description
	WHERE Id = @p_id AND Lang = @p_lang;

