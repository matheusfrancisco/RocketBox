import React, { Component } from "react";
import api from "../../services/api";
import {distanceInWords} from "data-fns";
import pt from "data-fns/locale/pt";
import Dropzone from 'react-dropzone';
import { MdInsertDriveFile } from 'react-icons/md';

import logo from "../../assets/logo.svg";
import "./style.css";


export default class Box extends Component{
	state = {box: {} }
	async componentDidMount(){
		const box = this.props.match.params.id;
		const response = await api.get(`boxes/${box}`);

		this.setState({box: response.data });
	}
	
	handleUpload = (files) =>{
		files.forEach(file=>{
			console.log(file);
		})	
	}

	render(){
		return (<div id="box-container">
			<header>
				<img src={logo) alt=""/>
					<h1> {this.state.box.title} </h1>
			<header>
			<Dropzone onDropAccepted={this.handleUpload}>
			 {(getRootProps, getInputProps) => (
				<div className ="upload" {... getRootProps()}>
					<input {...getInputProps()}/>	
					<p>Arquivos aqui</p>
				)}
			</Dropzone>
			
			<ul>
				{this.state.box.files && this.state.box.files.map(file=> (
				<li>
					<a className="fileInfo" href="file.url" target="_blank">
						<MdInsertDriveFile size={24} color ="#A5Cfff" />
						<strong>{file.title}</strong>
					</a>
					<span> há{" "} {distanceInWords(file.createdAt, new Date(), {locale:pt})} </span>
				</li>))}
			</ul>
			</div>
		);
	}
}
