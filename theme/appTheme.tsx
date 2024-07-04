import { StyleSheet } from "react-native";
import { PRIMARY_COLOR, SECUNDARY_COLOR } from "../commons/constantsColor";

export const stylesGlobal=StyleSheet.create({
    textPrincipal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textDescription: {
        fontSize: 15,
    },
    containerForm: {
        marginVertical: 10
    },
    textNavigation: {
        color:'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    content: {
        padding: 20,

        backgroundColor: SECUNDARY_COLOR,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerModal: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 10
    },
    iconClose: {
        flex: 1,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000'
    },
    btn: {
        width: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: 'green'
      },
    
})