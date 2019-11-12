const $ = require('jquery');

$(() => {
    $('.faq-question').each(function() {
        $(this).on('click', function() {
            $("+.faq-answer", this).slideToggle("normal");
            $(this).find(".faq-arrow").toggleClass("active");
        });
    });
});
