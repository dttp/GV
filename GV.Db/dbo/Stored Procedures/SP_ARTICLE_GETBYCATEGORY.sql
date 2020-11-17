CREATE PROCEDURE [dbo].[SP_ARTICLE_GETBYCATEGORY]
	@p_categoryId nvarchar(25),
	@p_lang nvarchar(25),
	@p_detail int,
	@p_startIndex int,
	@p_pageSize int,
	@p_sortBy nvarchar(25),
	@p_sortAsc int
AS	
BEGIN
	DECLARE @v_query nvarchar(max);
	SET @v_query = 'SELECT a.Id, a.Lang, a.Name, a.Description, a.CreatedDate, a.CategoryId, a.Thumbnail, a.LastModifiedDate';
	IF (@p_detail = 1)
	BEGIN	
		SET @v_query = @v_query + ', a.Data';
	END;

	SET @v_query = @v_query + ' FROM Article a WHERE a.CategoryId = ''' + @p_categoryId + ''' AND a.Lang = '''  + @p_lang + '''';
	SET @v_query = @v_query + ' ORDER BY a.' + @p_sortBy;
	IF (@p_sortAsc = 1)
	BEGIN
		SET @v_query = @v_query + ' ASC'
	END
	ELSE 
	BEGIN
		SET @v_query = @v_query + ' DESC'
	END;

	SET @v_query = @v_query + ' OFFSET ' + CONVERT(NVARCHAR(10), @p_startIndex) + ' ROWS FETCH NEXT ' + CONVERT(NVARCHAR(10), @p_pageSize) + ' ROWS ONLY';

	PRINT @v_query;
	EXEC sp_executesql @v_query;
END;