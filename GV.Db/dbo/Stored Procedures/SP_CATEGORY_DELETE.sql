﻿CREATE PROCEDURE [dbo].[SP_CATEGORY_DELETE]
	@p_id NVARCHAR(25)
AS
	DELETE [Category]
	WHERE Id = @p_id;
