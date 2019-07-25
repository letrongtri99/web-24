window.onload = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const name = document.getElementsByClassName("name");
    const body = document.getElementById("body");
    let timeEach;
    let s = [];
    const sum = (accumulator, currentValue) => accumulator + currentValue;
    fetch(`/getname/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            for (let i = 0; i < 4; i++) {
                name[i].innerHTML = data.data.namePerson[i];
            }
            if (data.data.html != " ") {
                body.innerHTML = data.data.html;
            }
            timeEach = data.data.times;
            if (data.data.score.length != 0) {
                var colSum = [];
                for (let i = 0; i < 4; i++) {
                    colSum[i] = 0;
                    var colScore = [];
                    for (let j = 1; j < timeEach; j++) {
                        var nhap = document.getElementsByClassName(j);
                        nhap[i].value = data.data.score[i][j - 1];
                        colSum[i] += Number(nhap[i].value);
                        colScore.push(Number(nhap[i].value));
                    }
                    document.getElementsByClassName("sum")[i].innerHTML = Number(colSum[i]);
                }
            }
        });
    document.getElementById("new").addEventListener('click', (event) => {
        body.insertAdjacentHTML(
            `beforeend`,
            `
            <tr>
                <th scope="row">Round ${timeEach}</th>
                <td><input class="${timeEach}" type="text"/></td>
                <td><input class="${timeEach}" type="text"/></td>
                <td><input class="${timeEach}" type="text"/></td>
                <td><input class="${timeEach}" type="text"/></td>
            </tr>
            `
        );
        ++timeEach;
        fetch(`/savehtml`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: id,
                html: body.innerHTML.toString(),
                times: timeEach,
            })
        });
    });

    document.querySelector(`#body`).addEventListener('change', () => {
        var colSum = [];
        var score = [];
        for (let i = 0; i < 4; i++) {
            colSum[i] = 0;
            var colScore = [];
            for (let j = 1; j < timeEach; j++) {
                var nhap = document.getElementsByClassName(j);
                colSum[i] += Number(nhap[i].value);
                colScore.push(Number(nhap[i].value));
            }
            document.getElementsByClassName("sum")[i].innerHTML = Number(colSum[i]);
            score.push(colScore);
        }
        s = score;
    });
    window.onbeforeunload = (event) => {
        if (s.length != 0) {
            fetch(`/savescore`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: id,
                    Score: s,
                })
            });
        }
    }
}