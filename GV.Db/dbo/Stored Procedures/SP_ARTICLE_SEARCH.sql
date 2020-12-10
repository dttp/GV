CREATE PROCEDURE [dbo].[SP_ARTICLE_SEARCH]
	@keyword nvarchar(500),
	@p_lang nvarchar(10),
	@p_startIndex int,
	@p_pageSize int
AS
BEGIN
	SELECT a.Id, a.Lang, a.CategoryId, a.CreatedDate, a.LastModifiedDate, a.Name, a.Description, a.Thumbnail, COUNT(*) OVER() as Count
	FROM Article a
	WHERE (CONTAINS(a.Name, @keyword) 
		OR CONTAINS(a.Description, @keyword)
		OR CONTAINS(a.Data, @keyword)) AND a.Lang = @p_lang
	ORDER BY a.LastModifiedDate DESC
	OFFSET @p_startIndex ROWS 
	FETCH NEXT @p_pageSize ROWS ONLY;
END
