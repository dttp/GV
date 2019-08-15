CREATE PROCEDURE [dbo].[SP_SETTING_SETSETTING]
	@id nvarchar(50),
	@value nvarchar(max)
AS
	IF EXISTS (SELECT * FROM Setting WHERE Id = @id)
	BEGIN
		UPDATE SETTING
		SET Value = @value
		WHERE Id = @id
	END
	ELSE
	BEGIN
		INSERT INTO SETTING(Id, Value)
		VALUES(@id, @value)
	END
