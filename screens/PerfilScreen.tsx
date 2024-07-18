import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage, db, auth } from "../config/Config";
import {
  getDownloadURL,
  ref as reff,
  uploadBytes,
} from "firebase/storage";
import {
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { useFonts } from "expo-font";
import { Icon } from "@rneui/base";

export default function PerfilScreen({ navigation }: any) {
  const [datos, setDatos] = useState<any>({
    name: "",
    lastName: "",
    nick: "",
    age: "",
    email: "",
  });

  const [userimg, setuserimg] = useState(
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
  );
  const [nick, setnick] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = usuarioActual();
        if (user === null) {
          return;
        }
        setnick(user.displayName ? user.displayName : "");

        const starCountRef = ref(db, "usuarios/" + user.uid);
        onValue(starCountRef, (snapshot) => {
          if (datos.name !== "") return;
          if (snapshot.exists()) {
            const data = snapshot.val();
            setDatos(data);
            setUsuario(data);
            return;
          } else {
            console.error("No hay datos en la referencia.");
          }
        });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  function setUsuario(data: any) {
    setName(data.firstName);
    setLastName(data.lastName);
    setAge(data.age);
    setMail(data.email);
  }

  function usuarioActual() {
    const user = auth.currentUser;
    if (user) {
      if (user.photoURL === null) {
        setuserimg("https://cdn-icons-png.flaticon.com/512/12595/12595885.png");
      } else {
        setuserimg(user.photoURL);
      }
    }
    return user;
  }

  function cerrarSesion() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("Mensaje", "Se cerró la sesión");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(error.code, error.message);
      });
  }

  function editar() {
    setEditable(!editable);
  }

  const pickImage = async () => {
    if (!editable) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setuserimg(result.assets[0].uri);
    }
  };

  async function guardar() {
    setLoading(true);
    const user = auth.currentUser;
    if (user === null) {
      setLoading(false);
      return;
    }

    const userRef = ref(db, "usuarios/" + user.uid);
    update(userRef, {
      firstName: name,
      lastName: lastname,
      age: age,
      email: mail,
    });

    if (userimg) {
      const storageRef = reff(storage, "usuarios/" + user.uid); // Subir imagen al storage
      try {
        const response = await fetch(userimg);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob, {
          contentType: "image/jpg",
        });
        console.log("La imagen se subió con éxito");
        const imageUrl = await getDownloadURL(storageRef);

        await updateProfile(user, {
          photoURL: imageUrl,
          displayName: nick,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    }

    Alert.alert("Éxito", "Registro actualizado");
    setEditable(!editable);
    setLoading(false);
  }

  const [fontsLoaded] = useFonts({
    pixel: require("../assets/fonts/pixel.ttf"),
    
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/fondo-bienv2.jpg")}
        style={[styles.imgbackground, styles.fixed, { zIndex: -1 }]}
      />
      <ScrollView>
        <View>
          <View>
            <Image source={{ uri: userimg }} style={styles.userimg} />
            <Text style={styles.text}>Bienvenid@</Text>
            <Text style={styles.usertext}>{nick}</Text>
          </View>
          <View style={styles.titulo}>
            <Text style={styles.titulo2}>Datos de Usuario</Text>
          </View>
          <View>
            <Text style={styles.subtitulo}>Nombre:</Text>
            <TextInput
              style={editable ? styles.editable : styles.noeditable}
              editable={editable}
              onChangeText={(value) => setName(value)}
            >
              {name}
            </TextInput>
            <Text style={styles.subtitulo}>Apellidos:</Text>
            <TextInput
              style={editable ? styles.editable : styles.noeditable}
              editable={editable}
              onChangeText={(value) => setLastName(value)}
            >
              {lastname}
            </TextInput>
            <Text style={styles.subtitulo}>Edad:</Text>
            <TextInput
              style={editable ? styles.editable : styles.noeditable}
              editable={editable}
              keyboardType="numeric"
              onChangeText={(value) => setAge(value)}
            >
              {age}
            </TextInput>
            <Text style={styles.subtitulo}>Correo:</Text>
            <TextInput
              style={editable ? styles.editable : styles.noeditable}
              editable={editable}
              keyboardType="email-address"
              onChangeText={(value) => setMail(value)}
            >
              {mail}
            </TextInput>
            <View>
              <Text style={styles.subtitulo}>Foto de Perfil</Text>
              <Pressable onPress={pickImage}>
                <Image source={{ uri: userimg }} style={styles.profileimg} />
              </Pressable>
            </View>
          </View>
          <View style={styles.icono}>
            <Icon
              reverse
              name="sign-out"
              type="font-awesome"
              color="#3B28B1"
              onPress={() => cerrarSesion()}
            />
            {loading ? (
              <ActivityIndicator size={70} color="#0000ff" />
            ) : editable ? (
              <Icon
                reverse
                name="save"
                type="font-awesome"
                color="#3B28B1"
                onPress={() => guardar()}
              />
            ) : (
              <Icon
                reverse
                name="edit"
                type="font-awesome"
                color="#3B28B1"
                onPress={() => editar()}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imgbackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  userimg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  usertext: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  titulo: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  titulo2: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  editable: {
    borderWidth: 1,
    borderColor: '#3B28B1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  noeditable: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  profileimg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  icono: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});
