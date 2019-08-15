﻿CREATE PROCEDURE [dbo].[SP_ARTICLE_INSERT]
	@id nvarchar(25),
	@lang nvarchar(3),
	@name nvarchar(100),
	@description nvarchar(500) = null,
	@data nvarchar(max) = null,
	@categoryId nvarchar(25),
	@visible bit = 1,
	@thumbnail nvarchar(1000)
AS
	INSERT INTO Article(Id, Lang, Name, Description, Data, CreatedDate, CategoryId, Visible, Thumbnail)
	VALUES(@id, @lang, @name, @description, @data, GETDATE(), @categoryId, @visible, @thumbnail);