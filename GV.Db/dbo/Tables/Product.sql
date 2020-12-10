CREATE TABLE [dbo].[Product]
(
	[Id] NVARCHAR(25) NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(255) NOT NULL, 
    [Model] NVARCHAR(255) NOT NULL, 
    [Type] NVARCHAR(255) NOT NULL, 
    [Manufacturer] NVARCHAR(255) NOT NULL, 
    [PlaceOfManufacturing] NVARCHAR(512) NOT NULL, 
    [TechnicalSpecs] NVARCHAR(MAX) NOT NULL, 
    [ManufacturerISO9000CertNumber] NVARCHAR(255) NOT NULL, 
    [ISO9000CertVerifyLink] NVARCHAR(255) NOT NULL, 
    [ImporterName] NVARCHAR(255) NOT NULL, 
    [ImporterAddress] NVARCHAR(512) NOT NULL, 
    [ImporterPhone] NVARCHAR(255) NOT NULL, 
    [ImporterTax] NVARCHAR(255) NULL, 
    [ImporterEmail] NVARCHAR(255) NULL, 
    [SerialPhotos] NVARCHAR(MAX) NULL,
    [SerialNumber] NVARCHAR(255) NULL,
    [WorkingFrequency] NVARCHAR(255) NULL, 
    [Capacity] NVARCHAR(255) NULL, 
    [SpuriousEmissionLevel] NVARCHAR(255) NULL, 
    [Others] NVARCHAR(1024) NULL, 
    [CreatedDate] DATETIME NOT NULL
)
