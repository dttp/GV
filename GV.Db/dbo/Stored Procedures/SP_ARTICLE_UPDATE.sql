CREATE PROCEDURE [dbo].[SP_ARTICLE_UPDATE]
	@p_id nvarchar(25),
	@p_lang nvarchar(3),
	@p_name nvarchar(100),
	@p_description nvarchar(500) = null,
	@p_data nvarchar(max) = null,	
	@p_thumbnail nvarchar(1000)
AS
	UPDATE Article
	SET
		Name = @p_name,
		Description = @p_description,
		Data = @p_data,
		LastModifiedDate = GETDATE(),
		Thumbnail = @p_thumbnail
	WHERE 
		Id = @p_id AND Lang = @p_lang
