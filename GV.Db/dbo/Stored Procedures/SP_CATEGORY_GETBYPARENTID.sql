CREATE PROCEDURE [dbo].[SP_CATEGORY_GETBYPARENTID]
	@parentId NVARCHAR(25) = NULL,
	@lang NVARCHAR(3)
AS
	IF (@parentId IS NULL)
		SELECT * FROM Category WHERE ParentId IS NULL AND Lang = @lang ORDER BY Name ASC;
	ELSE 
		SELECT * FROM Category WHERE ParentId = @parentId AND Lang = @lang ORDER BY Name ASC;
