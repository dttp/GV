angular.module('gv.app.contact')
    .controller('contactCtrl', function ($scope, $article) {
        
        $scope.contactArticle = null;
        $scope.labels = {
            'en': {
                pageTitle: 'Contact',
                mapTitle: 'Where to find us',
                homeTitle: 'Home',
                leaveMsgTitle: 'Leave a message',
                phName: 'Your Name',
                phEmail: 'Your Email',
                phMsg: 'Write your message here...',
                submitBtnText: 'Submit'
            },
            'vn': {
                pageTitle: 'Liên hệ',
                mapTitle: 'Địa chỉ',
                homeTitle: 'Trang chủ',
                leaveMsgTitle: 'Gửi lời nhắn',
                phName: 'Tên của bạn',
                phEmail: 'Địa chỉ email của bạn',
                phMsg: 'Nhập lời nhắn của bạn tới chúng tôi...',
                submitBtnText: 'Gửi đi'
            }
        };

        $scope.message = {
            Name: '',
            Email: '',
            Data: ''
        };

        $scope.sendMessage = function () {
            
        };

        $scope.init = function () {
            $article.getByCategory('sys-contact', $scope.selectedLanguage.value).then(function (response) {
                $scope.contactArticle = response.data[0];
                console.log($scope.contactArticle);
            });
        };

        $scope.$on('languageChanged', function () {
            $scope.init();
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });