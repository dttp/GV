CREATE PROCEDURE [dbo].[SP_CATEGORY_INSERT]
	@id nvarchar(25),
	@lang nvarchar(3),
	@name nvarchar(100),
	@description nvarchar(500) = null,
	@parentId nvarchar(25) = null 
AS
	INSERT INTO [Category](Id, Lang, Name, Description, ParentId)
	VALUES (@id, @lang, @name, @description, @parentid)
