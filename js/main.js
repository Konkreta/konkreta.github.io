document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    // Get all "next-step" elements
    const $nextStep = Array.prototype.slice.call(document.querySelectorAll('.step'), 0);

    if ($nextStep.length > 0) {
        $nextStep.forEach(el => {
            el.addEventListener('click', () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Element to be hidden from the "data-hide" attribute
                const hide = el.dataset.hide;
                const $hide = document.getElementById(hide);


                if ('prev' === el.dataset.action) {
                    $target.classList.toggle('visuallyhidden');
                    $hide.classList.toggle('visuallyhidden');
                }

                var inputs = $hide.querySelectorAll('.input');
                var validation = [];

                inputs.forEach(function(input) {
                    input.reportValidity();
                    var status = input.checkValidity();
                    validation.push(status);

                    if (false === status) {
                        input.classList.add('is-danger');
                        input.classList.remove('is-success');
                    }

                    if (true === status) {
                        input.classList.remove('is-danger');
                        input.classList.add('is-success');
                    }

                });

                // Toggle the "visuallyhidden" class

                if (true === validation.every(function(value) {
                        return true === value;
                    })) {
                    $target.classList.toggle('visuallyhidden');
                    $hide.classList.toggle('visuallyhidden');
                }
            });
        });
    }

    // Get brazilian addresses
    const $endereco = Array.prototype.slice.call(document.querySelectorAll('.endereco'), 0);

    if ($endereco.length > 0) {
        var cep = document.getElementById('cep');

        cep.addEventListener('input', () => {
            var cepSanitized = cep.value.replace(/\D/g, '');

            if (cepSanitized.length == 8) {
                var requestURL = 'https://viacep.com.br/ws/' + cepSanitized + '/json/';
                var request = new XMLHttpRequest();
                request.open('GET', requestURL);
                request.responseType = 'json';
                request.send();
                request.onload = function() {
                    var address = request.response;
                    $endereco.forEach(el => {
                        const item = el.dataset.item;
                        const $item = document.getElementById(item);

                        // Populate input with returned address
                        $item.value = address[item];
                    });
                }
            }

        });
    }

    // Form

    // Access the form element...
    var form = document.getElementById("order");

    // ...and take over its submit event.
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var XHR = new XMLHttpRequest();
        var FD = new FormData(form);

        XHR.addEventListener("load", function(event) {
            alert(event.target.responseText);
			// Javascript redirect
        });

        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });

        XHR.open("POST", "https://example.com/cors.php");
        XHR.send(FD);
    });

});