CREATE PROCEDURE [dbo].[SP_PRODUCT_INSERT]
	@p_Id NVARCHAR(25), 
    @p_Name NVARCHAR(255), 
    @p_Model NVARCHAR(255), 
    @p_Type NVARCHAR(255), 
    @p_Manufacturer NVARCHAR(255), 
    @p_PlaceOfManufacturing NVARCHAR(512), 
    @p_TechnicalSpecs NVARCHAR(MAX), 
    @p_ManufacturerISO9000CertNumber NVARCHAR(255), 
    @p_ISO9000CertVerifyLink NVARCHAR(255), 
    @p_ImporterName NVARCHAR(255), 
    @p_ImporterAddress NVARCHAR(512), 
    @p_ImporterPhone NVARCHAR(255), 
    @p_ImporterTax NVARCHAR(255), 
    @p_ImporterFax NVARCHAR(255), 
    @p_SerialPhotos NVARCHAR(MAX),
    @p_SerialNumber nvarchar(255)
AS
BEGIN
	INSERT INTO Product (Id, Name, Model, Type, Manufacturer, PlaceOfManufacturing, TechnicalSpecs, ManufacturerISO9000CertNumber, ISO9000CertVerifyLink, ImporterName, ImporterPhone, ImporterAddress, ImporterFax, ImporterTax, SerialNumber, CreatedDate)
    VALUES (@p_Id, @p_Name, @p_Model, @p_Type, @p_Manufacturer, @p_PlaceOfManufacturing, @p_TechnicalSpecs, @p_ManufacturerISO9000CertNumber, @p_ISO9000CertVerifyLink, @p_ImporterName, @p_ImporterPhone, @p_ImporterAddress, @p_ImporterFax, @p_ImporterTax, @p_SerialNumber, GETDATE());
END
