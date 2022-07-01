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

let list;

$(async function (e) {
    list = await getList();
    showAtms(list);
})

$("#delAtm").click(async function() {
    hash = $('#delAtm').data('hash');
    console.log(hash);
    await postData('/api/controller/timer/delete', {hash:hash});
    location.href = "/top";
})

$(document).on("click", ".atm-btn", (e) => {
    const getBtn = e.target.closest("[data-hash]");
    showModal(getBtn.dataset.hash);
})

async function getList() {
    const res = await getData("/api/controller/timer/get")
    .then(res => {
        const reader = res.body.getReader();
        const result = reader.read().then(({done, value}) => {
            //console.log(new TextDecoder().decode(value));
            return JSON.parse(new TextDecoder().decode(value));
        })
        return result;
    });
    return res;
}

function showAtms(list) {
    boxies = "";
    for (const l of list) {
        boxies += genAtmBox(l);
    }
    $("#atms").append(boxies);
}

function showModal(hash) {
    $("#atmStatus").empty();
    $('#delAtm').data('hash', hash);
    let text;
    for (const l of list) {
        if(l.hash == hash) {
            text = genModalText(l);
            break;
        }
    }
    // console.log(text);
    $("#atmStatus").append(text);
}

funitures = {
    aircon: "エアコン",
    cooler: "冷房",
    light: "照明",
}

weekday = {
    0: "日",
    1: "月",
    2: "火",
    3: "水",
    4: "木",
    5: "金",
    6: "土",
}

function genAtmBox(l) {
    const mode = (l.mode === 1)? "一度きり": "週間";
    let stat = (l.command[1] === "on")? "success": "danger";
    stat = (l.isValid)? stat: "secondary";
    const fu = funitures[l.command[0]];

    return `<button class="btn btn-${stat} atm-btn" data-hash="${l.hash}" data-target="#atmModal" data-toggle="modal">
    <p class="time">${l.time}</p>
    <p class="command">${fu}</p>
    <p class="mode">${mode}</p>
    </button>
    `
}

function genModalText(l) {
    let result = "";
    const mode = (l.mode === 1)? "一度きり": "週間";
    const stat = (l.command[1] === "on")? "ON": "OFF";
    const iV = (l.isValid)? "有効": "無効";
    const fu = funitures[l.command[0]];

    if (l.mode === 1) {
        result += `<p><span>予定日時:</span> ${l.date} ${l.time}</p>`
    } else {
        wks = l.week.reverse();
        result += `<div><span>曜日:</span>`
        for (const w of wks) {
            result += `<div class="badge badge-pill badge-primary">${weekday[w]}</div> `
        }
        result += "</div>"
        //console.log(result);
        result += `<p><span>時刻:</span> ${l.time}</p>`
    }

    result += `
    <p><span>機器:</span> ${fu}</p>
    <p><span>状態:</span> ${stat}</p>
    <p><span>モード:</span> ${mode}</p>
    <p><span>実行設定:</span> ${iV}</p>
    `

    return result;
}
