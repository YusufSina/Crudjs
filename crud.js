class Alert {
    Success(title, message) {
        Swal.fire({
            type: 'success',
            title: title,
            text: message
        });
    }

    Error(title, message) {
        Swal.fire({
            type: 'error',
            title: title,
            text: message
        });
    }

    Confirm(title, text, confirmButtonText, callback) {
        Swal.fire({
            title: title,
            text: text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.value) {
                callback();
            }
        })
    }
}

class Rest {

    Rest(dataType, contentType) {
        this.dataType = dataType;
        this.contentType = contentType;
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

    Get(url, parameters, successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: url,
            data: JSON.stringify(parameters),
            contentType: this.contentType,
            dataType: this.dataType,
            success: successCallback,
            error: errorCallback
        });
    }
}

class Table {
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