import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import { Icon } from "native-base"

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            winnerAlert: new Animated.Value(0),
            winnerAlertHeight: new Animated.Value(0),
            winnerAlertWidth: new Animated.Value(0),
            winnerAlertHeight: new Animated.Value(0),
            winnerAlertborderRadius: new Animated.Value(0),
            gameWinner: "",
            isAlert: false,
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            currentPlayer: 1,

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
        let value = this.state.gameState[row][col]
        switch (value) {
            case 1: return <Icon name="close" style={styles.tilX} />;
            case -1: return <Icon name="radio-button-off" style={styles.tilO} />
            default: return < View />
        }
    }


    onTilePress = (row, col) => {
        let value = this.state.gameState[row][col]
        if (value == 0) {
            let currentPlayer = this.state.currentPlayer
            let arr = this.state.gameState.slice()
            arr[row][col] = currentPlayer
            this.setState({
                gameState: arr
            })

            let nextPlayer = (currentPlayer === 1) ? -1 : 1;
            this.setState({
                currentPlayer: nextPlayer
            })
        }

        let winner = this.getWinner()
        if (winner === 1) {
            this.setState({
                gameWinner: 1
            })
            this.initializeGame()
            this.winnerAnimatedViw()
        }
        if (winner === -1) {
            this.setState({
                gameWinner: -1
            })
            this.winnerAnimatedViw()
            this.initializeGame()
        }
        var asd = this.state.gameState;
    }

    getWinner = () => {
        let arr = this.state.gameState;
        let sum;

        for (let i = 0; i < 3; i++) {
            sum = arr[i][0] + arr[i][1] + arr[i][2];
            if (sum === 3) {
                return 1;
            }
            else if (sum === -3) {
                return -1
            }

        }
        for (let i = 0; i < 3; i++) {
            sum = arr[0][i] + arr[1][i] + arr[2][i]
            if (sum === 3) {
                return 1;
            }
            else if (sum === -3) {
                return -1
            }
        }

        sum = arr[0][0] + arr[1][1] + arr[2][2];
        if (sum === 3) {
            return 1;
        }
        else if (sum === -3) {
            return -1
        }
        sum = arr[0][2] + arr[1][1] + arr[2][0]
        if (sum === 3) {
            return 1;
        }
        else if (sum === -3) {
            return -1
        }
    }

    winnerAnimatedViw = () => {
        Animated.sequence([
            Animated.timing(this.state.winnerAlert, {
                toValue: 1,
                duration: 500,
            }),
        ]).start()

        Animated.parallel([
            Animated.timing(this.state.winnerAlertHeight, {
                toValue: 1,
                duration: 400,
                easing: Easing.elastic(),
            }),
            Animated.timing(this.state.winnerAlertborderRadius, {
                toValue: 1,
                duration: 500,
                easing: Easing.bounce,
            })
        ]).start()
    }

    newGame = () => {
        this.initializeGame()
        Animated.parallel([
            Animated.timing(this.state.winnerAlert, {
                toValue: 0,
                duration: 200,
            }).start()
        ])
        Animated.parallel([
            Animated.timing(this.state.winnerAlertHeight, {
                toValue: 0,
                duration: 400,
                easing: Easing.elastic(),
            }),
            Animated.timing(this.state.winnerAlertborderRadius, {
                toValue: 0,
                duration: 500,
                easing: Easing.bounce,
            }).start()
        ]).start()
        this.setState({ isAlert: false })
    }

    render() {
        const opacity = this.state.winnerAlert.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
        const height = this.state.winnerAlertHeight.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0%", "45%", "50%"]
        })
        const width = this.state.winnerAlertHeight.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0%", "45%", "80%"]
        })
        const borderRadius = this.state.winnerAlertborderRadius.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 2]
        })


        return (
            <View style={styles.container}>
                <Animated.View style={{
                    height,
                    backgroundColor: "#0da192",
                    width, zIndex: 1,
                    opacity,
                    borderRadius,
                    position: "absolute"
                }} >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }} >
                        {(this.state.gameWinner === 1) ?
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center" }} >
                                    <Icon name="close" style={[styles.tilX, { fontSize: 80, color: "#fff" }]} />
                                    <Text style={{ color: "#545454", fontSize: 50 }} >Winner!</Text>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center" }} >
                                    <Icon name="radio-button-off" style={[styles.tilX, { fontSize: 80, color: "#fff" }]} />
                                    <Text style={{ color: "#545454", fontSize: 50 }} >Winner!</Text>
                                </View>
                            </View>}
                        <View style={{ marginTop: "10%" }} >
                            <TouchableOpacity activeOpacity={0.6} onPress={() => { this.newGame() }} >
                                <Icon name="refresh" style={[styles.tilX, { fontSize: 50, color: "#fff" }]} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </Animated.View>
                <View style={{ justifyContent: "center", alignItems: "center" }} >
                    <View style={{ alignItems: "center", justifyContent: "center" }} >
                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(0, 0)}
                                style={[styles.box, { borderTopWidth: 0, borderLeftWidth: 0, }]} >
                                {this.renderIcon(0, 0)}
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(0, 1)} style={[styles.box, { borderTopWidth: 0, }]} >
                                {this.renderIcon(0, 1)}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.box, { borderTopWidth: 0, borderRightWidth: 0, }]} >
                                {this.renderIcon(0, 2)}
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(1, 0)} style={[styles.box, { borderLeftWidth: 0, }]} >
                                {this.renderIcon(1, 0)}
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(1, 1)} style={[styles.box, {}]} >
                                {this.renderIcon(1, 1)}
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(1, 2)} style={[styles.box, { borderRightWidth: 0, }]} >
                                {this.renderIcon(1, 2)}
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: "row" }} >
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(2, 0)} style={[styles.box, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
                                {this.renderIcon(2, 0)}
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(2, 1)} style={[styles.box, { borderBottomWidth: 0 }]} >
                                {this.renderIcon(2, 1)}
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onTilePress(2, 2)} style={[styles.box, { borderBottomWidth: 0, borderRightWidth: 0 }]} >
                                {this.renderIcon(2, 2)}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { this.newGame() }}
                    style={{ marginTop: 50, borderColor: "#0da192", borderWidth: 3, padding: 10 }}
                >
                    <Text style={{ fontSize: 20, color: "#0da192", fontWeight: "bold" }} >New Game</Text>
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
        backgroundColor: '#14bdac',
    },
    box: {
        borderColor: "#0da192",
        borderWidth: 5,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tilX: {
        color: "#545454",
        fontSize: 60,
    },
    tilO: {
        color: "#f2ebd3",
        fontSize: 60,
    }
});