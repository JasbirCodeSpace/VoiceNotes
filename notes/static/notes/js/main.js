$(function () {
$(".create-note").modalForm({formURL: "{% url 'notes/create-note' %}", modalID: "#create-modal"});

});