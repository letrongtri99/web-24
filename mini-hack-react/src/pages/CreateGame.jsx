import React from 'react';

class CreateGame extends React.Component {
    sendName = () => {
        const name = document.getElementsByClassName("form-control");
        const x = [];
        for(var i=0;i<name.length;i++){
            x.push(name[i].value);
        }
        fetch(`http://localhost:8080/create-name`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                namePerson: x,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                window.location.assign(`http://localhost:3000/games/${data.id}`);
            })
    }
    render() {
        // console.log(this.props.history);
        // this.props.history.push()
        return (
            <div className="container">
                <h3>ScoreKeeper</h3>
                <input type="text" className="form-control" placeholder="Player 1" aria-describedby="basic-addon2" />
                <input type="text" class="form-control" placeholder="Player 2" aria-describedby="basic-addon2" />
                <input type="text" class="form-control" placeholder="Player 3" aria-describedby="basic-addon2" />
                <input type="text" class="form-control" placeholder="Player 4" aria-describedby="basic-addon2" />
                <div class="text-center">
                    <button type="button" class="btn btn-danger" id="new" onClick={this.sendName}>CREATE NEW GAME</button>
                </div>
            </div>
        );
    }
}

export default CreateGame;