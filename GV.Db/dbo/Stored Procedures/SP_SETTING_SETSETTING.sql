CREATE PROCEDURE [dbo].[SP_SETTING_SETSETTING]
	@p_id nvarchar(50),
	@p_value nvarchar(max)
AS
	IF EXISTS (SELECT * FROM Setting WHERE Id = @p_id)
	BEGIN
		UPDATE SETTING
		SET Value = @p_value
		WHERE Id = @p_id
	END
	ELSE
	BEGIN
		INSERT INTO SETTING(Id, Value)
		VALUES(@p_id, @p_value)
	END
