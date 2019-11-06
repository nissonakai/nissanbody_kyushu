const $ = require('jquery');

$(() => {
    $('.faq-question').each(function() {
        $(this).on('click', function() {
            $("+.faq-answer", this).slideToggle("normal", function() {
                if ($(this).is(':visible')) {
                    $(this).css("display", "flex");
                }
            });
            return false;
        });
    });
});
