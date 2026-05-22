import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useState } from 'react';

export default function App() {

  // Estado que guarda os filmes
  const [filmes, setFilmes] = useState([]);

  // Estado do texto digitado
  const [pesquisa, setPesquisa] = useState('');

  // Função que busca os filmes
  async function buscarFilmes() {

    // Evita busca vazia
    if (pesquisa === '') {
      return;
    }

    try {

      const resposta = await fetch(
        `https://www.omdbapi.com/?apikey=fb605106&s=${pesquisa}`
      );

      const dados = await resposta.json();

      // Verifica se encontrou filmes
      if (dados.Search) {
        setFilmes(dados.Search);
      } else {
        setFilmes([]);
      }

    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.titulo}>
        App de Filmes
      </Text>

      {/* Campo de pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Digite um filme"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {/* Botão */}
      <TouchableOpacity
        style={styles.botao}
        onPress={buscarFilmes}
      >
        <Text style={styles.textoBotao}>
          Buscar
        </Text>
      </TouchableOpacity>

      {/* Lista de filmes */}
      <FlatList
        data={filmes}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (

          <View style={styles.card}>

            {/* Poster */}
            <Image
              source={{ uri: item.Poster }}
              style={styles.poster}
            />

            {/* Nome */}
            <Text style={styles.nome}>
              {item.Title}
            </Text>

            {/* Ano */}
            <Text style={styles.ano}>
              {item.Year}
            </Text>

          </View>

        )}
      />

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    width: 320,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#222',
    width: 320,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: 320,
    alignItems: 'center',
  },

  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  ano: {
    fontSize: 16,
    marginTop: 5,
  },

});