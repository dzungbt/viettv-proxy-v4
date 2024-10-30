// const proxy_url = 'http://127.0.0.1:8080'
// const video_url = 'http://118.70.233.58:5010/channels/K_cine/K_cine.m3u8'
// const file_extension = '.m3u8'

// const hls_proxy_url = `${proxy_url}/${btoa(video_url)}${file_extension}`
// console.log('hls_proxy_url: ', hls_proxy_url)

var aesEcb = require('aes-ecb');
const fs = require('fs');
const content = fs.readFileSync('./playlist.m3u8', { encoding: 'utf-8'});
require("dotenv").config();
// console.log('content: ', content, '---> type : ', typeof content);
const m3u8Parser = require('m3u8-parser');

var parser = new m3u8Parser.Parser();

parser.push(content);
parser.end();

var parsedManifest = parser.manifest;

const segments = parsedManifest.segments

segments.forEach((segment, index) => {
    if (index > 700 || index < 600) return
    const name = segment.title.split(',')[1]
    const url = segment.uri
    // console.log(name, url)
    console.log('UPDATE tv_channels SET channel_url = ' + '"http://proxy-eu.viet-tv.online/'+ aesEcb.encrypt(process.env.TOKEN, url)+'.m3u8" where channel_name = "' + name + '";')
})

// console.log('parsedManifest: ', parsedManifest)