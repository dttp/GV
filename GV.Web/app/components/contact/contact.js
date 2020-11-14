angular.module('gv.app.contact')
    .controller('contactCtrl', function ($scope, $contact) {
        $scope.emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        $scope.locale = {
            pageTitle: {
                en: 'Contact Us',
                vn: 'Liên hệ với chúng tôi'
            },
            section: {
                contactInfo: {
                    caption: {
                        en: 'Contact Info',
                        vn: 'Thông tin liên hệ'
                    },
                    address: {
                        en: 'Address: No 60/61 Pham Tuan Tai Street North Tu Liem District, Hanoi, Vietnam',
                        vn: 'Địa chỉ: Số 60/61 Phạm Tuấn Tài, Quận Bắc Từ Liêm, Hà Nội, Việt Nam'
                    }
                },
                contactForm: {
                    caption: {
                        en: 'Have a question',
                        vn: 'Gửi câu hỏi tới chúng tôi'
                    },
                    label: {
                        yourName: {
                            en: 'Your Name',
                            vn: 'Tên của bạn'
                        },
                        yourEmail: {
                            en: 'Your Email',
                            vn: 'Email của bạn'
                        },
                        message: {
                            en: 'Message',
                            vn: 'Câu hỏi của bạn'
                        },
                        submitButton: {
                            en: 'Submit',
                            vn: 'Gửi đi'
                        }
                    },
                    error: {
                        yourNameRequired: {
                            en: 'Your Name is required',
                            vn: 'Bạn chưa nhập tên của bạn'
                        },
                        yourEmailRequired: {
                            en: 'Your Email is required',
                            vn: 'Bạn chưa nhập địa chỉ email'
                        },
                        yourEmailInvalid: {
                            en: 'Your Email is invalid',
                            vn: 'Địa chỉ email của bạn chưa chính xác'
                        },
                        messageRequired: {
                            en: 'Message is required',
                            vn: 'Bạn chưa nhập câu hỏi'
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
                YourName: '',
                YourEmail: '',
                Message: ''
            };
        };
        

        $scope.submitForm = function (form) {
            if (!form.$invalid) {
                $contact.sendMessage($scope.contactInfo).then(function () {
                    $scope.alertSvc.addSuccess($scope.locale.message.sendSuccess[$scope.selectedLanguage.value]);
                    $scope.reset();
                });
            } else {
                form.$dirty = true;
            }
        };

        $scope.init = function () {
            $scope.sidebarMenu.setActive('sbContact');
            $scope.reset();
        };

        $scope.$on('languageChanged', function () {
            $scope.init();
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });