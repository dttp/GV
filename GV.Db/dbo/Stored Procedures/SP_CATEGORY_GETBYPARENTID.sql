CREATE PROCEDURE [dbo].[SP_CATEGORY_GETBYPARENTID]
	@p_parentId NVARCHAR(25) = NULL,
	@p_lang NVARCHAR(3)
AS
	IF (@p_parentId IS NULL)
		SELECT * FROM Category WHERE ParentId IS NULL AND Lang = @p_lang ORDER BY Name ASC;
	ELSE 
		SELECT * FROM Category WHERE ParentId = @p_parentId AND Lang = @p_lang ORDER BY Name ASC;
