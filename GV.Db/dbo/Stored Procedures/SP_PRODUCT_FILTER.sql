CREATE PROCEDURE [dbo].[SP_PRODUCT_FILTER]
	@p_StartIndex INT,
	@p_PageSize INT,
	@p_SortBy NVARCHAR(50),
	@p_sortAsc INT
AS
BEGIN
	DECLARE @v_query nvarchar(max);
	SET @v_query = 'SELECT p.*, Count(*) OVER () as Count ';

	SET @v_query = @v_query + ' FROM Product p ';
	SET @v_query = @v_query + ' ORDER BY p.' + @p_SortBy;
	IF (@p_sortAsc = 1)
	BEGIN
		SET @v_query = @v_query + ' ASC'
	END
	ELSE 
	BEGIN
		SET @v_query = @v_query + ' DESC'
	END;

	SET @v_query = @v_query + ' OFFSET ' + CONVERT(NVARCHAR(10), @p_StartIndex) + ' ROWS FETCH NEXT ' + CONVERT(NVARCHAR(10), @p_PageSize) + ' ROWS ONLY';

	PRINT @v_query;
	EXEC sp_executesql @v_query;
END
