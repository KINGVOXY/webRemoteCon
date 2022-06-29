$("#l-on").click(async function lightOn(e) {
    await postData('/api/controller/light/on')
});
$("#l-off").click(async function lightOn(e) {
    await postData('/api/controller/light/off')
});
$("#c-on").click(async function lightOn(e) {
    await postData('/api/controller/cooler/on')
});
$("#a-off").click(async function lightOn(e) {
    await postData('/api/controller/aircon/off')
});

$("#timer").click(async function (e) {
    await postData('/api/controller/timer/test')
});