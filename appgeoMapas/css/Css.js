import {StyleSheet} from "react-native";
const css = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    map:{
        height: '70%',
        width: '100%',
        
    },
    search:{
        height: '30%'
    },
    distancia:{
       marginTop: -40
    },
    marcador: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
        marginLeft: -10,    
      
      },
      
      marcadorImage: {
        width: 30,
        height: 20,
        resizeMode: 'contain',
        marginBottom: -15,
        zIndex: 65,
      },
      
      marcadorTextBox: {
        backgroundColor: 'transparent',
        paddingHorizontal: 9,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        position: 'relative',

      },      
      
      marcadorText: {
        color: '#000',
        fontSize: 7,       
        fontWeight: 'bold',     
     
     
      },
});

export {css};