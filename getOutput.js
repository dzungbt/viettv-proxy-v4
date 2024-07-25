const proxy_url = 'http://127.0.0.1:8080'
const video_url = 'http://118.70.233.58:5010/channels/K_cine/K_cine.m3u8'
const file_extension = '.m3u8'

const hls_proxy_url = `${proxy_url}/${btoa(video_url)}${file_extension}`
console.log('hls_proxy_url: ', hls_proxy_url)