import $ from 'jquery';

const UA = navigator.userAgent.toLowerCase();
const uaCheck = agent => UA.indexOf(agent) == -1;
const mobileDevise = ['iphone', 'ipad', 'ipod', 'iemobile', 'tizen', 'android'];
const checkedDevise = mobileDevise.filter(devise => {
    return uaCheck(devise);
});
if (checkedDevise.length == 6) {
    location.href = 'https://www.717450.net/priority/nissanshatai_kyushu/'
};

$(() => {
    $('.faq-question').each(function() {
        $(this).on('click', function() {
            $("+.faq-answer", this).slideToggle();
            $(this).find(".faq-arrow").toggleClass("active");
        });
    });
});

