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
