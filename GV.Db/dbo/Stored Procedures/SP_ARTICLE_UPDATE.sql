CREATE PROCEDURE [dbo].[SP_ARTICLE_UPDATE]
	@id nvarchar(25),
	@lang nvarchar(3),
	@name nvarchar(100),
	@description nvarchar(500) = null,
	@data nvarchar(max) = null,	
	@thumbnail nvarchar(1000)
AS
	UPDATE Article
	SET
		Name = @name,
		Description = @description,
		Data = @data,
		LastModifiedDate = GETDATE(),
		Thumbnail = @thumbnail
	WHERE 
		Id = @id AND Lang = @lang
