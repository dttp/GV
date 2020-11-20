var module = angular.module('gv.app.product', ['angularFileUpload']);
module.controller('productRegisterCtrl', function ($scope, FileUploader) {

    $scope.locale = {
        title: {
            en: 'Product information',
            vn: 'Thông tin sản phẩm'
        },
        fields: {
            name: {
                en: "Product's Name",
                vn: "Sản phẩm"
            },
            model: {
                en: 'Model',
                vn: 'Nhãn hiệu'
            },
            type: {
                en: 'Type',
                vn: 'Kiểu, loại'
            },
            manufacturer: {
                en: 'Manufacturer',
                vn: 'Nhà sản xuất'
            },
            placeOfManufacturing: {
                en: 'Place of manufacturing',
                vn: 'Địa chỉ nơi sản xuất'
            },
            technicalSpecs: {
                en: 'Technical specifications',
                vn: 'Đặc tính kỹ thuật'
            },
            manufacturerISO9000CertNumber: {
                en: "Manufacturer's ISO 9000 certificate number",
                vn: 'Số chứng chỉ ISO9000 của nhà sản xuất'
            },
            iSO9000CertVerifyLink: {
                en: "Link to verify ISO",
                vn: "Link để thẩm tra ISO"
            },
            importerDomesticManufacturerSection: {
                en: 'Name of the importer or domestic manufacturer',
                vn: 'Đơn vị nhập khẩu hoặc nhà  SX trong nước'
            },
            importerName: {
                en: "Name holder",
                vn: 'Tên đơn vị',
            },
            importerAddress: {
                en: 'Address',
                vn: 'Địa chỉ'
            },
            importerPhone: {
                en: 'Phone',
                vn: 'Số điện thoại'
            },
            importerTax: {
                en: 'Tax',
                vn: 'Mã số thuế'
            },
            serialPhotos: {
                en: 'Serial number of the template or a photo of the label with the serial number of the template',
                vn: 'Số serial của mẫu hoặc ảnh chụp tem nhãn có serial của mẫu'
            }
        },
        errors: {
            nameRequired: {
                en: 'product name is required',
                vn: 'bạn chưa nhập tên sản phẩm'
            },
            modelRequired: {
                en: 'model is required',
                vn: 'bạn chưa nhập nhãn hiệu sản phẩm'
            },
            typeRequired: {
                en: 'type is required',
                vn: 'bạn chưa nhập kiểu/loại sản phẩm'
            },
            manufacturerRequired: {
                en: 'manufacturer is required',
                vn: 'bạn chưa nhập nhà sản xuất'
            },
            placeOfManufacturingRequired: {
                en: 'place of manufacturing is required',
                vn: 'bạn chưa nhập nơi sản xuất'
            },
            technicalSpecsRequired: {
                en: 'Technical specification is required',
                vn: 'Bạn chưa nhập đặc tính kỹ thuật'
            },
            manufacturerISO9000CertNumberRequired: {
                en: "Manufacturer's ISO 9000 certificate number is required",
                vn: "Bạn chưa nhập Số chứng chỉ ISO9000 của nhà sản xuất"
            },
            iSO9000CertVerifyLinkRequired: {
                en: 'Link to verify ISO is required',
                vn: 'Bạn chưa nhập Link để thẩm tra ISO'
            },
            importerNameRequired: {
                en: "Name holder is required",
                vn: 'Bạn chưa nhập tên đơn vị',
            },
            importerAddressRequired: {
                en: 'Address is required',
                vn: 'Bạn chưa nhập địa chỉ'
            },
            importerPhoneRequired: {
                en: 'Phone is required',
                vn: 'Bạn chưa nhập số điện thoại'
            },
            importerTaxRequired: {
                en: 'Tax is required',
                vn: 'Bạn chưa nhập mã số thuế'
            }
        }
    };

     var uploader = $scope.uploader = new FileUploader({
        //headers: {
        //    Authorization: 'Basic ' + $localStorage.authData
        //},
        url: WEBAPI_ENDPOINT + '/api/fs/upload',
        autoUpload: false
    });

    $scope.product = {
        technicalSpecs: []
    };

    $scope.addSpecs = function () {
        $scope.product.technicalSpecs.push({
            id: _.uniqueId('spec-'),
            value: ''
        });

        $scope.product.specAdded = true;
    };

    $scope.removeSpec = function (id) {
        _.remove($scope.product.technicalSpecs, {id: id});
    };

    $scope.hasSpecs = function () {
        var hasSpecs = $scope.product.technicalSpecs && $scope.product.technicalSpecs.length > 0;

        if (hasSpecs) {
            hasSpecs = hasSpecs && _.findIndex($scope.product.technicalSpecs, (s) => _.trim(s.value).length > 0) >= 0;
        }

        return hasSpecs;
    };

    $scope.selectFile = function () {
        angular.element('#fileImport').trigger('click');
    };

    $scope.removePhoto = function (item) {
        uploader.removeFromQueue(item);
    };

    $scope.submit = function (form) {
        $scope.product.specAdded = true;
        if (form.$invalid || !$scope.hasSpecs()) {
            angular.forEach(form.$error, function (controls, errorName) {
                angular.forEach(controls, function (control) {
                    control.$setDirty();
                });
            });
        } else {

        }

    };

    $scope.init = function () {
        $scope.sidebarMenu.setActive('sbRegisterProduct');  
    };

    $scope.$on('languageChanged', function () { $scope.init(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});

module.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);