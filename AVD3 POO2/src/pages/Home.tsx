import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Platform} from 'react-native'
import { Button } from '../components/Button'
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface DadosCadastrais {
  id: string;
  nomePais: string;
}

export function Home(){
  
  const [novoId, setNovoId] = useState('')
  const [novoPais, setNovoPais] = useState('')
  const [data, setData] = useState<DadosCadastrais[]>([])
  useEffect(() => {
    async function loadData(){
      const cadastrosArmazenados = await AsyncStorage.getItem('@meuscadastros:cadastros')
      if(cadastrosArmazenados){
        setData(JSON.parse(cadastrosArmazenados))
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function saveData(){
      await AsyncStorage.setItem('@meuscadastros:cadastros', JSON.stringify(data))
    }
    saveData()
  }, [data])

  function handleAdd(){
    if(novoId.trim() !== '' && novoPais.trim() !== ''){
      const novaData = {
        id: novoId,
        nomePais: novoPais
      }
      setData([...data, novaData])
      setNovoId('')
      setNovoPais('')
    }
  }

  function handleRemove(id: string){
    setData(data.filter(item => item.id !== id))
  }

  return (
    <>
      <View style={styles.container}>
      <Text style={[styles.titleSimple, {marginVertical: 0}]}>
        Cadastro
        </Text>
        <TextInput style={styles.input} keyboardType = 'numeric' placeholder = 'Código do País' value={novoId} 
        placeholderTextColor = '#919191' onChangeText={value => setNovoId(value)} onSubmitEditing={handleAdd} />
        <TextInput style={styles.input} placeholder = 'Nome do País' value = {novoPais}
         placeholderTextColor = '#919191' onChangeText={value => setNovoPais(value)} onSubmitEditing={handleAdd} />
        <Button
          color = '#0DD92F' 
          onPress={handleAdd} 
          title = "Cadastrar"
        />
        <Text style = {[styles.title, {marginVertical: 20}]}>
          Cadastros Realizados
        </Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Pais</DataTable.Title>
            <DataTable.Title>Ação</DataTable.Title>
          </DataTable.Header>
          {data.map((a, index) => {
            return(
              <DataTable.Row key = {index}>
                <DataTable.Cell>{a.id}</DataTable.Cell>
                <DataTable.Cell>{a.nomePais}</DataTable.Cell>
                <DataTable.Cell><Button title = 'Remover' color = 'red' onPress = {() => {handleRemove(a.id)}}></Button></DataTable.Cell>
              </DataTable.Row>
            )
          })}
        </DataTable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 70,
      paddingVertical: 40,
    },
    titleSimple: {
      color: 'black',
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: 30,
    },
    input: {
      backgroundColor: '#d6d6d6',
      color: 'black',
      fontSize: 15,
      padding: Platform.OS == 'ios' ? 15 : 10,
      marginTop: 10,
    },
    title: {
      fontSize: 17,
      fontWeight: 'bold',
      color:'#FFFFFF',
    },
    textSkill: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: 'bold'
    },
    flatList: {
      paddingBottom: 50
    },
    HeadStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#ffe0f0'
    },
    tableText: {
      color: '#FFFFFF'
    },
})