angular.module('fileUpload', ['ngFileUpload'])
    .controller('MyCtrl', ['Upload', '$window', function(Upload, $window) {
        var vm = this;
        vm.submit = function() { //function to call on form submit
            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                vm.upload(vm.file); //call upload function
            }
        }
        vm.upload = function(file) {
            Upload.upload({
                url: 'http://localhost:7000/upload', //webAPI exposed to upload the file
                data: {
                    file: file
                } //pass file as data, should be user ng-model
            }).then(function(resp) { //upload function returns a promise
                if (resp.status === 200) { //validate success
                    //$window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                    resp.data = 'data:text/plain;charset=utf-8,' + resp.data;
                    var a = document.getElementById('download');
                    a.href = resp.data;
                    a.download = "invoice.txt";
                    a.click();
                } else {
                    $window.alert('an error occured');
                }
            }, function(resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function(evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
    }]);