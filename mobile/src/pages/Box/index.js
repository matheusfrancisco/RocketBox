import React, { Component } from 'react';
import ImagePicker from "react-native-image-picker";

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import api from "../../services/api";

import {distanceInWords}  from "data-fns";
import pt from "date-fns/locale/pt";
import RNFS from 'react-native-fs';
import Fileviewer from 'react-native-file-viewer';

export default class Box extends Component {
	state = { box :{}};

	async componentDidMount(){

		const box = await AsyncStorage.getItem('@RocketBox:box');
		this.subscriberToNewFiles(box);
		const response = await api.get(`boxes/${box}`);
		this.setState({box: response.data});
	}

	subscribeToNewFile= (box) =>{

		const io = socket('url-do-axios');
		io.emit('connectRoom', box);
		io.on('file', data=> {this.setState({box: {... this.state.box, files: [data,... this.state.box.files]}})});
	}	


	openFile = async (file) => {
		const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
		try {	
			await RNFS.downloadFile({
				fromUrl: file.url,
				toFile: filePath
			});

			await FileViewer.open(filePath);
		}catch (err){
			console.log('error');
		}

	}

	renderItem = ({item}) => (
		<TouchableOpacity
			onPress= {() => this.openFile(item)}
			styles = {styles.files}
		>
		<View style={styles.fileInfo}>
			<Icon name="insert-drive-file" size={24} color="#A5CFFF" />
			<Text style={styles.fileTitle}>{item.title}</Text>
		</View>
		
		<Text style={styles.fileDate}>há 
			{distanceInWords(item.createdAt, new Date(), {locale:pt})}		
		</Text>
		</TouchableOpacity>
	);

	handleUpload =() =>{
		ImagePicker.launchImageLibrary({},async upload => {
			if(upload.error){
				console.log('cancel by user');
			}else if( upload.didCancel){
				console.log('Canceled by user');
			} else {
				console.log(uplaod);
				const data = new FormData();

				const [prefix, suffix] = upload.fileName.split('.');

				const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;
				data.append('file', {
					uri: upload.uri,
					type: uplaod.type,
					name: `${prefix}.${ext}`
			})
		  	api.post(`boxes/${this.state.box._id}}/files`, data);
          }
		});
	};

	render(){
		return (
			<View styel={styles.container}>
			 <Text style={styles.boxTitle}>Box</Text>
			 <FlatList
				style={styles.list}
				data={this.state.box.files}
				keyExtractor = {file=> filse._id}
				ItemSeparatorComponent= {() => <View style={styles.separator}/>}
				renderItem = {this.renderItem}
			 />

			<TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
				<Icon name="cloud-upload" size={24} color="FFF"/>			
			</TouchableOpacity>
			</View>		
		);
	}
}
