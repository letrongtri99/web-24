import React from 'react';

let timeEach;
let s = [];
let id;
class PlayScreen extends React.Component {
    Add = (event) => {
        event.preventDefault();
        var body = document.getElementById('body');
        body.insertAdjacentHTML(
            `beforeend`,
            `
            <tr>
                <th scope="row">Round ${timeEach}</th>
                <td><input class="${timeEach}" type="text" /></td>
                <td><input class="${timeEach}" type="text" /></td>
                <td><input class="${timeEach}" type="text" /></td>
                <td><input class="${timeEach}" type="text" /></td>
            </tr>
            `
        );
        ++timeEach;
        var score = [];
        for (let i = 0; i < 4; i++) {
            var colScore = [];
            for (let j = 1; j < timeEach; j++) {
                var nhap = document.getElementsByClassName(j);
                colScore.push(Number(nhap[i].value));
            }
            score.push(colScore);
        }
        s = score;
        fetch(`http://localhost:8080/savehtml`, {
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
    }
    componentDidMount() {
        const url = window.location.pathname;
        id = url.substring(url.lastIndexOf('/') + 1);
        var name = document.getElementsByClassName("name");
        var body = document.querySelector(`#body`);
        fetch(`http://localhost:8080/getname/${id}`, {
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
        document.getElementsByClassName("table")[0].addEventListener('change', (event) => {
            event.preventDefault();
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
            console.log(s);
        });
        window.onbeforeunload = (event) => {
            event.preventDefault();
            if (s.length != 0) {
                fetch(`http://localhost:8080/savescore`, {
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
    render() {
        return (
            <div className="container">
                <table className="table" >
                    <thead className="thead-light">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" className="name"></th>
                            <th scope="col" className="name"></th>
                            <th scope="col" className="name"></th>
                            <th scope="col" className="name"></th>
                        </tr>
                    </thead>
                    <tbody id="body" >
                        <tr>
                            <th scope="row">Sum of score</th>
                            <td className="sum">0</td>
                            <td className="sum">0</td>
                            <td className="sum">0</td>
                            <td className="sum">0</td>
                        </tr>
                        <tr>
                            <th scope="row">Round 1</th>
                            <td><input className="1" type="text" /></td>
                            <td><input className="1" type="text" /></td>
                            <td><input className="1" type="text" /></td>
                            <td><input className="1" type="text" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button type="button" class="btn btn-danger" id="new" onClick={this.Add}>ADD ROUND</button>
                </div>
            </div>
        );
    }
}

export default PlayScreen;