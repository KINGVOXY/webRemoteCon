async function postData(url = '', data = { }) {
    const dataStr = JSON.stringify(data);

    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: dataStr
    });
    return response;
}

async function getData(url = '') {

    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
    });
    return response;
}
