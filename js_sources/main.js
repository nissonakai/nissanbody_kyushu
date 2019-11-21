import $ from 'jquery';

$(() => {
    $('.faq-question').each(function() {
        $(this).on('click', function() {
            $("+.faq-answer", this).slideToggle();
            $(this).find(".faq-arrow").toggleClass("active");
        });
    });
});
