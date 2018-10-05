/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Icon } from "native-base"



export default class Game extends Component {
    constructor() {
        super()
        this.state = {
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],

        }
    }


    componentDidMount() {
        this.initializeGame()
    }

    initializeGame = () => {
        this.setState({
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            currentPlayer: 1
        })

    }

    renderIcon = (row, col) => {
        var value = this.state.gameState[row][col];
        console.log(value)
        switch (value) {
            case 1: return <Icon name="close" style={styles.tilX} />;
            case -1: return <Icon name="radio-button-off" style={styles.tilO} />;
            default: return <View />;
        }
    }

    onTilePress = (row, col) => {
        let value = this.state.gameState[row][col]
        if (value !== 0) { return; }
        let currentPlayer = this.state.currentPlayer
        let arr = this.state.gameState.slice()
        arr[row][col] = currentPlayer;
        this.setState({ gameState: arr })
        let nextPlayer = (currentPlayer === 1) ? -1 : 1;
        this.setState({
            currentPlayer: nextPlayer
        })

        let winner = this.getWinner()
        if (winner === 1) {
            alert("Player 1 is winner")
            this.initializeGame()
        }
        if (winner === -1) {
            alert("Player 2 is winner")
            this.initializeGame()
        }
    }

    getWinner = () => {
        const NUM_TILES = 3
        let sum;
        let arr = this.state.gameState

        for (let i = 0; i < NUM_TILES; i++) {
            sum = arr[i][0] + arr[i][1] + arr[i][2]
            if (sum === 3) { return 1 }
            else if (sum === -3) { return -1 }
        }
        for (let i = 0; i < NUM_TILES; i++) {
            sum = arr[0][i] + arr[1][i] + arr[2][i]
            if (sum === 3) { return 1 }
            else if (sum === -3) { return -1 }
        }

        sum = arr[0][0] + arr[1][1] + arr[2][2]
        if (sum === 3) { return 1 }
        else if (sum === -3) { return -1 }

        sum = arr[2][0] + arr[1][1] + arr[0][2]
        if (sum === 3) { return 1 }
        else if (sum === -3) { return -1 }

        return 0

    }


    render() {
        return (
            <View style={styles.container}>
                {/* 1ST ROW */}
                <View style={{ flexDirection: "row" }} >
                    <TouchableOpacity onPress={() => this.onTilePress(0, 0)}
                     style={[styles.box, { borderTopWidth: 0, borderLeftWidth: 0, }]} >
                        {this.renderIcon(0, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.box, { borderTopWidth: 0, }]} >
                        {this.renderIcon(0, 1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.box, { borderTopWidth: 0, borderRightWidth: 0, }]} >
                        {this.renderIcon(0, 2)}
                    </TouchableOpacity>
                </View>

                {/* 2ND ROW */}
                <View style={{ flexDirection: "row" }} >
                    <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.box, { borderLeftWidth: 0, }]} >
                        {this.renderIcon(1, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.box, {}]} >
                        {this.renderIcon(1, 1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.box, { borderRightWidth: 0, }]} >
                        {this.renderIcon(1, 2)}
                    </TouchableOpacity>
                </View>

                {/* 3RD ROW */}
                <View style={{ flexDirection: "row" }} >
                    <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.box, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
                        {this.renderIcon(2, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.box, { borderBottomWidth: 0 }]} >
                        {this.renderIcon(2, 1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.box, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
                        {this.renderIcon(2, 2)}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                 style={{marginTop:50, borderColor:"#000", borderWidth:2, padding:10 }}
                onPress={()=>{this.initializeGame()}} >
                    <Text style={{fontSize:20, color:"#000"}} >New Game</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    box: {
        borderColor: "#000",
        borderWidth: 10,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tilX: {
        color: "red",
        fontSize: 60,
    },
    tilO: {
        color: "green",
        fontSize: 60,

    }
});
{/* <ion-icon name="radio-button-off"></ion-icon> */ }