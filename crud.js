(function (window) {
    'use strict'

    function MyLibrary() {
        var myLibrary = {};
        /*
        <summary>
        This class is for SweetAlert and it has 3 methods.
        Using it on other pages, you have to use like that:
        
            var alert = new window.myLibrary.Alert();

        then you can use the methods with alert object;
        */
        myLibrary.Alert = class {
            constructor() { }

            Success(title, message) {
                swal({
                    title: title,
                    text: message,
                    icon: "success",
                });
            }

            Error(title, message) {
                swal({
                    icon: 'error',
                    title: title,
                    text: message
                });
            }

            Confirm(title, text, callback) {
                swal({
                    title: title,
                    text: text,
                    icon: 'warning',
                    buttons: {
                        cancel: "Vazgeç",
                        ok: true
                    }
                }).then((result) => {
                    if (result) {
                        callback();
                    }
                })
            }
        }
        /*
        <summary>
        This class is for Rest requests.
        Using it on other pages, you have to use like that:
        
            var rest = new window.myLibrary.Rest(dataType, contentType);

        then you can use the methods with rest object;
        */
        myLibrary.Rest = class {
            constructor(dataType, contentType) {
                this.dataType = dataType;
                this.contentType = contentType;
            }

            Get(url, successCallback, errorCallback) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    contentType: this.contentType,
                    dataType: this.dataType,
                    success: successCallback,
                    error: errorCallback
                });


            }

            Post(url, parameters, successCallback, errorCallback) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: JSON.stringify(parameters),
                    contentType: this.contentType,
                    dataType: this.dataType,
                    success: successCallback,
                    error: errorCallback
                });
            }
        }
        /*
        <summary>
        This class is for Notify.
        Using it on other pages, you have to use like that:
        
            var rest = new window.myLibrary.Notify();

        then you can use the methods with notify object;
        */
        myLibrary.Notify = class {
            constructor() { }

            Success(text) {
                $.notify(text, {
                    position: 'bottom right',
                    className: 'success'
                });
            }

            Error(text) {
                $.notify(text, {
                    position: 'bottom right',
                    className: 'error'
                });
            }

            Warning(text) {
                $.notify(text, {
                    position: 'bottom right',
                    className: 'warn'
                });
            }
        }

        myLibrary.Table = class {
            constructor() { }
            AddServerSide(id, columnDefs, url) {
                return $('#' + id).DataTable({
                    "searchable": true,
                    "bDestroy": true,
                    "ordering": true,
                    "serverSide": true,
                    "responsive": true,
                    "sortable": true,
                    "processing": true,
                    "paging": true,
                    "lengthMenu": [
                        [10, 25, 50, 100],
                        [10, 25, 50, 100]
                    ],
                    "pageLength": 10,
                    ajax: {
                        url: url,
                        type: "POST"
                    },
                    columnDefs: columnDefs,
                    order: [
                        [0, 'asc']
                    ]
                });
            };

            AddClientSide(id) {
                return $('#' + id).DataTable({
                    "searchable": true,
                    "bDestroy": true,
                    "ordering": true,
                    "serverSide": false,
                    "responsive": true,
                    "sortable": true,
                    "processing": false,
                    "paging": true,
                    "lengthMenu": [
                        [10, 25, 50, 100],
                        [10, 25, 50, 100]
                    ],
                    "pageLength": 10
                });
            }

            Reload(id) {
                $('#' + id).DataTable().ajax.reload();
            }

            DeleteRow(id) {
                $('#' + id).remove();
            }
        }

        return myLibrary;
    }

    if (typeof (window.Library) === "undefined") {
        window.Library = MyLibrary();
    }
})(window);