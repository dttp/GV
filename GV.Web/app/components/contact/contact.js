angular.module('gv.app.contact')
    .controller('contactCtrl', function ($scope, $contact) {
        $scope.emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        $scope.locale = {
            pageTitle: {
                en: 'Contact Info',
                vn: 'Thông tin liên hệ'
            },
            section: {
                contactInfo: {
                    caption: {
                        en: 'GV COMPANY LTD',
                        vn: 'Công ty TNHH GV'
                    },
                    address: {
                        en: 'Address: No 60/61 Pham Tuan Tai Street North Tu Liem District, Hanoi, Vietnam',
                        vn: 'Địa chỉ: Số 60/61 Phạm Tuấn Tài, Quận Bắc Từ Liêm, Hà Nội, Việt Nam'
                    }
                },
                contactForm: {
                    caption: {
                        en: 'Contact Us',
                        vn: 'Liên hệ với chúng tôi'
                    },
                    label: {
                        company: {
                            en: 'Company',
                            vn: 'Công ty',
                        },
                        contact: {
                            en: 'Contact',
                            vn: 'Người liên hệ'
                        },
                        phone: {
                            en: 'Tel',
                            vn: 'Điện thoại'
                        },
                        fax: {
                            en: 'Fax',
                            vn: 'Số Fax'
                        },
                        email: {
                            en: 'Email',
                            vn: 'Email'
                        },
                        address: {
                            en: 'Address',
                            vn: 'Địa chỉ'
                        },
                        message: {
                            en: 'Message',
                            vn: 'Nội dung'
                        },
                        submitButton: {
                            en: 'Submit',
                            vn: 'Gửi đi'
                        }
                    },
                    error: {
                        companyRequired: {
                            en: 'Company is required',
                            vn: 'Bạn chưa nhập tên công ty'
                        },
                        contactRequired: {
                            en: 'Contact is required',
                            vn: 'Bạn chưa nhập người liên hệ'
                        },
                        phoneRequired: {
                            en: 'Tel is required',
                            vn: 'Bạn chưa nhập số điện thoại'
                        },
                        emailRequired: {
                            en: 'Email is required',
                            vn: 'Bạn chưa nhập email',
                        },
                        emailInvalid: {
                            en: 'Invalid email address',
                            vn: 'Địa chỉ email chưa chính xác'
                        },
                        addressRequired: {
                            en: 'Address is required',
                            vn: 'Bạn chưa nhập địa chỉ'
                        },
                        messageRequired: {
                            en: 'Message is required',
                            vn: 'Bạn chưa nhập nội dung'
                        }
                    }
                }
            },
            message: {
                sendSuccess: {
                    en: 'Thank you for your message. We will check and feedback to you shortly.',
                    vn: 'Cám ơn bạn đã gửi câu hỏi. Chúng tôi sẽ kiểm tra và phản hồi sớm nhất có thể.'
                }
            }
        }

        $scope.reset = function () {
            $scope.contactInfo = {
                Company: '',
                Contact: '',
                Email: '',
                Phone: '',
                Fax: '',
                Address: '',
                Message: ''
            };
        };

        $scope.setVerified = function(value) {
            $scope.reCaptchaVerified = value;
        };

        $scope.reCaptchaVerified = false;

        $scope.submitForm = function (form) {
            if (!form.$invalid) {
                $contact.sendMessage($scope.contactInfo).then(function () {
                    $scope.alertSvc.addSuccess($scope.locale.message.sendSuccess[$scope.selectedLanguage.value]);
                    $scope.reset();
                    form.$setPristine();
                });
            } else {
                form.$dirty = true;
            }
        };

        $scope.init = function () {
            $scope.sidebarMenu.setActive('sbContact');
            $scope.reset();

            $scope.setInit();
        };

        $scope.$on('languageChanged', function () {
            $scope.init();
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });