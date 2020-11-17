CREATE PROCEDURE [dbo].[SP_ARTICLE_INSERT]
	@p_id nvarchar(25),
	@p_lang nvarchar(3),
	@p_name nvarchar(100),
	@p_description nvarchar(500) = null,
	@p_data nvarchar(max) = null,
	@p_categoryId nvarchar(25),	
	@p_thumbnail nvarchar(1000)
AS
	INSERT INTO Article(Id, Lang, Name, Description, Data, CreatedDate, LastModifiedDate, CategoryId, Thumbnail)
	VALUES(@p_id, @p_lang, @p_name, @p_description, @p_data, GETDATE(), GETDATE(), @p_categoryId, @p_thumbnail);
