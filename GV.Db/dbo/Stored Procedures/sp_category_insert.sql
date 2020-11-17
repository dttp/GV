CREATE PROCEDURE [dbo].[SP_CATEGORY_INSERT]
	@p_id nvarchar(25),
	@p_lang nvarchar(3),
	@p_name nvarchar(100),
	@p_description nvarchar(500) = null,
	@p_parentId nvarchar(25) = null 
AS
	INSERT INTO [Category](Id, Lang, Name, Description, ParentId)
	VALUES (@p_id, @p_lang, @p_name, @p_description, @p_parentid)
