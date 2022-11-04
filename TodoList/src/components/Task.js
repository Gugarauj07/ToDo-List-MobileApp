import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import {Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
            onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='white'/>
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name='trash' size={20} color='white' style={styles.excludeIcon}/>
                <Text  style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                        <View style={styles.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>
            
                    </TouchableWithoutFeedback>  
                    <View>
                        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

function getCheckView(doneAt){
    if (doneAt != null){
        return (
            <View style={styles.done}>
                
            </View>
        )
    } else {
        return (
            <View style={styles.pending}>
               
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth:1,
        alignItems: 'center',
        paddingVertical:10,
        backgroundColor: 'white'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderWidth:1,
        borderRadius:13,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:13,
        backgroundColor: '#4D7031',
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex:1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily:  commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10,
    },
    excludeIcon: {
        marginLeft: 10,
    }
})