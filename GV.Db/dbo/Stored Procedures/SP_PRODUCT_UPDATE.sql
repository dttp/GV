CREATE PROCEDURE [dbo].[SP_PRODUCT_UPDATE]
	@P_Id NVARCHAR(25), 
    @P_Name NVARCHAR(255), 
    @P_Model NVARCHAR(255), 
    @P_Type NVARCHAR(255), 
    @P_Manufacturer NVARCHAR(255), 
    @P_PlaceOfManufacturing NVARCHAR(512), 
    @P_TechnicalSpecs NVARCHAR(MAX), 
    @P_ManufacturerISO9000CertNumber NVARCHAR(255), 
    @P_ISO9000CertVerifyLink NVARCHAR(255), 
    @P_ImporterName NVARCHAR(255), 
    @P_ImporterAddress NVARCHAR(512), 
    @P_ImporterPhone NVARCHAR(255), 
    @P_ImporterTax NVARCHAR(255), 
    @P_ImporterFax NVARCHAR(255), 
    @p_SerialNumber nvarchar(255),
    @P_SerialPhotos NVARCHAR(MAX), 
    @P_WorkingFrequency NVARCHAR(255), 
    @P_Capacity NVARCHAR(255), 
    @P_SpuriousEmissionLevel NVARCHAR(255), 
    @P_Others NVARCHAR(1024)
AS
BEGIN

    UPDATE Product
    SET
        Name = @P_Name,
        Model = @P_Model,
        Type = @P_Type,
        Manufacturer = @P_Manufacturer,
        PlaceOfManufacturing = @P_PlaceOfManufacturing,
        TechnicalSpecs = @P_TechnicalSpecs,
        ManufacturerISO9000CertNumber = @P_ManufacturerISO9000CertNumber,
        ISO9000CertVerifyLink = @P_ISO9000CertVerifyLink,
        ImporterName = @P_ImporterName,
        ImporterAddress = @P_ImporterAddress,
        ImporterFax = @P_ImporterFax,
        ImporterPhone = @P_ImporterPhone,
        ImporterTax = @P_ImporterFax,
        SerialNumber = @p_SerialNumber,
        SerialPhotos = @P_SerialPhotos,
        WorkingFrequency = @P_WorkingFrequency, 
        Capacity = @P_Capacity,
        SpuriousEmissionLevel = @P_SpuriousEmissionLevel,
        Others = @P_Others
    WHERE Id = @P_Id;
END;
